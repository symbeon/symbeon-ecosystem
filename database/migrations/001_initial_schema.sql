-- Symbeon Ecosystem - Initial Database Schema
-- PostgreSQL 16+

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS & AUTHENTICATION
-- ============================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    wallet_address VARCHAR(42) UNIQUE,
    password_hash VARCHAR(255),
    role VARCHAR(50) DEFAULT 'user' NOT NULL,
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_login_at TIMESTAMP,
    profile_data JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_wallet ON users(wallet_address);
CREATE INDEX idx_users_role ON users(role);

-- ============================================
-- FUNNEL (Funil Inteligente)
-- ============================================

CREATE TABLE funnel_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    group_type VARCHAR(50) NOT NULL, -- 'developer', 'investor', 'enterprise', 'community'
    answers JSONB NOT NULL,
    score INTEGER,
    persona VARCHAR(100),
    recommendations JSONB,
    monetization_path VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_funnel_user ON funnel_responses(user_id);
CREATE INDEX idx_funnel_group ON funnel_responses(group_type);
CREATE INDEX idx_funnel_created ON funnel_responses(created_at);

-- ============================================
-- CERTIFICATION REQUESTS
-- ============================================

CREATE TABLE certification_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    organization_name VARCHAR(255) NOT NULL,
    project_name VARCHAR(255) NOT NULL,
    compliance_requirements TEXT[] NOT NULL,
    project_description TEXT,
    contact_email VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' NOT NULL,
    estimated_cost DECIMAL(10, 2),
    actual_cost DECIMAL(10, 2),
    blockchain_certificate_id BIGINT,
    ipfs_hash VARCHAR(255),
    audit_notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP
);

CREATE INDEX idx_cert_status ON certification_requests(status);
CREATE INDEX idx_cert_org ON certification_requests(organization_name);
CREATE INDEX idx_cert_created ON certification_requests(created_at);

-- ============================================
-- DONATIONS & INVESTMENTS
-- ============================================

CREATE TABLE donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donor_address VARCHAR(42) NOT NULL,
    donor_email VARCHAR(255),
    amount DECIMAL(20, 8) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    donation_type VARCHAR(50) NOT NULL, -- 'general', 'seed', 'series_a', 'grant'
    tx_hash VARCHAR(66) UNIQUE,
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending' NOT NULL,
    confirmed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_donations_donor ON donations(donor_address);
CREATE INDEX idx_donations_tx ON donations(tx_hash);
CREATE INDEX idx_donations_status ON donations(status);
CREATE INDEX idx_donations_type ON donations(donation_type);

-- ============================================
-- PAYMENTS (Licenciamento, Cursos, etc.)
-- ============================================

CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    payment_method VARCHAR(50) NOT NULL, -- 'crypto', 'stripe', 'paypal'
    payment_type VARCHAR(50) NOT NULL, -- 'license', 'course', 'consultation', 'api_subscription'
    status VARCHAR(50) DEFAULT 'pending' NOT NULL,
    tx_hash VARCHAR(66),
    stripe_payment_id VARCHAR(255),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP DEFAULT NOW(),
    confirmed_at TIMESTAMP
);

CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_type ON payments(payment_type);

-- ============================================
-- API KEYS (API de Validação Ética)
-- ============================================

CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    key_hash VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    tier VARCHAR(50) DEFAULT 'free' NOT NULL, -- 'free', 'pro', 'enterprise'
    requests_limit INTEGER NOT NULL,
    requests_used INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP,
    last_used_at TIMESTAMP
);

CREATE INDEX idx_api_keys_user ON api_keys(user_id);
CREATE INDEX idx_api_keys_hash ON api_keys(key_hash);
CREATE INDEX idx_api_keys_active ON api_keys(is_active);

-- ============================================
-- COURSES & CERTIFICATIONS
-- ============================================

CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    duration_hours INTEGER,
    level VARCHAR(50), -- 'beginner', 'intermediate', 'advanced'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE course_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    payment_id UUID REFERENCES payments(id),
    progress INTEGER DEFAULT 0, -- 0-100%
    completed_at TIMESTAMP,
    certificate_issued BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_enrollments_user ON course_enrollments(user_id);
CREATE INDEX idx_enrollments_course ON course_enrollments(course_id);

-- ============================================
-- ANALYTICS & METRICS
-- ============================================

CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB DEFAULT '{}'::jsonb,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_events_type ON events(event_type);
CREATE INDEX idx_events_user ON events(user_id);
CREATE INDEX idx_events_created ON events(created_at);

-- ============================================
-- VIEWS FOR ANALYTICS
-- ============================================

CREATE VIEW funnel_analytics AS
SELECT 
    group_type,
    COUNT(*) as total_responses,
    AVG(score) as avg_score,
    COUNT(DISTINCT user_id) as unique_users,
    DATE_TRUNC('day', created_at)::DATE as date
FROM funnel_responses
GROUP BY group_type, DATE_TRUNC('day', created_at)::DATE;

CREATE VIEW certification_pipeline AS
SELECT 
    status,
    COUNT(*) as count,
    SUM(estimated_cost) as total_value,
    AVG(estimated_cost) as avg_value
FROM certification_requests
GROUP BY status;

CREATE VIEW revenue_by_source AS
SELECT 
    payment_type,
    currency,
    SUM(amount) as total,
    COUNT(*) as transactions,
    DATE_TRUNC('month', confirmed_at)::DATE as month
FROM payments
WHERE status = 'confirmed'
GROUP BY payment_type, currency, DATE_TRUNC('month', confirmed_at)::DATE;

CREATE VIEW user_growth AS
SELECT 
    DATE_TRUNC('week', created_at)::DATE as week,
    COUNT(*) as new_users,
    SUM(COUNT(*)) OVER (ORDER BY DATE_TRUNC('week', created_at)::DATE) as cumulative_users
FROM users
GROUP BY DATE_TRUNC('week', created_at)::DATE;

-- ============================================
-- FUNCTIONS
-- ============================================

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certification_requests_updated_at BEFORE UPDATE ON certification_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INITIAL DATA
-- ============================================

-- Free tier para API keys
INSERT INTO api_keys (user_id, key_hash, name, tier, requests_limit) VALUES
    (NULL, 'demo_key_hash', 'Demo API Key', 'free', 1000);

COMMENT ON TABLE users IS 'Usuários do sistema';
COMMENT ON TABLE funnel_responses IS 'Respostas do funil inteligente';
COMMENT ON TABLE certification_requests IS 'Solicitações de certificação ética';
COMMENT ON TABLE donations IS 'Doações e investimentos via crypto';
COMMENT ON TABLE payments IS 'Pagamentos (licenças, cursos, etc.)';
COMMENT ON TABLE api_keys IS 'Chaves de API para validação ética';

