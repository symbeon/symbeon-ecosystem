use axum::{
    routing::{get, post},
    Router,
};
use tower_http::cors::{Any, CorsLayer};
use sqlx::PgPool;
use std::sync::Arc;

pub mod routes;
pub mod state;
pub mod error;

use state::AppState;

pub async fn create_app(db_pool: PgPool) -> Router {
    let state = Arc::new(AppState {
        db: db_pool,
        // Inicializar outros serviços
    });

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    Router::new()
        // Health check
        .route("/health", get(health_check))
        
        // Auth routes
        .route("/api/v1/auth/register", post(routes::auth::register))
        .route("/api/v1/auth/login", post(routes::auth::login))
        .route("/api/v1/auth/me", get(routes::auth::get_current_user))
        
        // Funnel routes
        .route("/api/v1/funnel/questions/:group", get(routes::funnel::get_questions))
        .route("/api/v1/funnel/submit", post(routes::funnel::submit_funnel))
        
        // Certification routes
        .route("/api/v1/certification/request", post(routes::certification::request_certification))
        .route("/api/v1/certification/verify/:id", get(routes::certification::verify))
        .route("/api/v1/certification/status/:id", get(routes::certification::get_status))
        
        // Payment routes
        .route("/api/v1/payments/create-invoice", post(routes::payments::create_invoice))
        .route("/api/v1/payments/wallet/:currency", get(routes::payments::get_wallet_address))
        .route("/api/v1/payments/verify/:tx_hash", get(routes::payments::verify_payment))
        
        // AI Assistant routes
        .route("/api/v1/assistant/chat", post(routes::assistant::chat))
        
        .layer(cors)
        .with_state(state)
}

async fn health_check() -> &'static str {
    "OK"
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_health_check() {
        let response = health_check().await;
        assert_eq!(response, "OK");
    }
}
