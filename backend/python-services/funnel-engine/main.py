"""
Symbeon Funnel Engine
Funil inteligente com árvore de perguntas personalizada
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Dict, Optional
from datetime import datetime
import asyncpg
import os

app = FastAPI(
    title="Symbeon Funnel Engine",
    version="0.1.0",
    description="Sistema de funil inteligente para qualificação de leads"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: Restringir em produção
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================
# MODELS
# ============================================

class Question(BaseModel):
    id: str
    text: str
    options: List[str]
    level: int
    group: str

class Answer(BaseModel):
    question_id: str
    answer: str

class FunnelSubmission(BaseModel):
    user_id: str
    group: str
    answers: List[Answer]
    email: Optional[EmailStr] = None

class NextAction(BaseModel):
    action: str
    label: str

class FunnelResult(BaseModel):
    score: int
    persona: str
    recommendations: List[str]
    next_actions: List[NextAction]
    monetization_path: str

# ============================================
# QUESTION TREES
# ============================================

DEVELOPER_QUESTIONS = [
    {
        "id": "dev_1",
        "level": 1,
        "text": "Qual é seu foco principal?",
        "options": ["Backend/APIs", "Frontend/UX", "ML/AI", "Pesquisa acadêmica"],
        "group": "developer"
    },
    {
        "id": "dev_2",
        "level": 2,
        "text": "Você já trabalhou com frameworks de IA ética?",
        "options": ["Sim, tenho experiência", "Não, mas estou interessado", "Apenas pesquisa teórica"],
        "group": "developer"
    },
    {
        "id": "dev_3",
        "level": 3,
        "text": "Como prefere contribuir?",
        "options": ["Código (bounties)", "Documentação (revenue-share)", "Pesquisa (co-autoria)", "Testes/QA (recompensas)"],
        "group": "developer"
    },
]

INVESTOR_QUESTIONS = [
    {
        "id": "inv_1",
        "level": 1,
        "text": "Qual o perfil do seu investimento?",
        "options": ["Seed/Angel (< $500k)", "Series A ($500k - $5M)", "Series B+ (> $5M)", "Fundo de impacto/ESG"],
        "group": "investor"
    },
    {
        "id": "inv_2",
        "level": 2,
        "text": "Qual seu interesse principal?",
        "options": ["Tecnologia/Produto", "Impacto social/ESG", "Compliance/Regulatório", "Mercado/Escalabilidade"],
        "group": "investor"
    },
    {
        "id": "inv_3",
        "level": 3,
        "text": "Você investe internacionalmente?",
        "options": ["Sim, via crypto", "Sim, via fiat", "Apenas local", "Depende do projeto"],
        "group": "investor"
    },
]

ENTERPRISE_QUESTIONS = [
    {
        "id": "ent_1",
        "level": 1,
        "text": "Qual o tamanho da sua organização?",
        "options": ["Startup (< 50)", "Média empresa (50-500)", "Enterprise (> 500)", "Governo/ONG"],
        "group": "enterprise"
    },
    {
        "id": "ent_2",
        "level": 2,
        "text": "Qual serviço te interessa?",
        "options": ["Certificação ética", "Protocolos personalizados", "Auditoria e compliance", "Licenciamento SEVE"],
        "group": "enterprise"
    },
    {
        "id": "ent_3",
        "level": 3,
        "text": "Quando pretende iniciar?",
        "options": ["Imediatamente (< 1 mês)", "Curto prazo (1-3 meses)", "Médio prazo (3-6 meses)", "Pesquisa/Avaliação"],
        "group": "enterprise"
    },
]

COMMUNITY_QUESTIONS = [
    {
        "id": "com_1",
        "level": 1,
        "text": "Qual seu nível de experiência?",
        "options": ["Iniciante", "Intermediário", "Avançado", "Professor/Educador"],
        "group": "community"
    },
    {
        "id": "com_2",
        "level": 2,
        "text": "O que você busca?",
        "options": ["Aprender sobre IA ética", "Certificação profissional", "Material educacional", "Participar de pesquisa"],
        "group": "community"
    },
    {
        "id": "com_3",
        "level": 3,
        "text": "Interesse em cursos pagos?",
        "options": ["Sim, cursos estruturados", "Sim, certificações", "Não, apenas conteúdo gratuito", "Depende do preço"],
        "group": "community"
    },
]

QUESTIONS_DB = {
    "developer": DEVELOPER_QUESTIONS,
    "investor": INVESTOR_QUESTIONS,
    "enterprise": ENTERPRISE_QUESTIONS,
    "community": COMMUNITY_QUESTIONS,
}

# ============================================
# ROUTES
# ============================================

@app.get("/")
async def root():
    return {
        "service": "Symbeon Funnel Engine",
        "version": "0.1.0",
        "status": "running"
    }

@app.get("/api/v1/funnel/questions/{group}", response_model=List[Question])
async def get_questions(group: str):
    """Retorna árvore de perguntas para o grupo"""
    if group not in QUESTIONS_DB:
        raise HTTPException(status_code=404, detail=f"Group '{group}' not found")
    
    questions = [Question(**q) for q in QUESTIONS_DB[group]]
    return questions

@app.post("/api/v1/funnel/submit", response_model=FunnelResult)
async def submit_funnel(submission: FunnelSubmission):
    """Processa respostas do funil e retorna análise"""
    
    # Calcular score
    score = calculate_score(submission.answers)
    
    # Determinar persona
    persona = determine_persona(submission.group, submission.answers)
    
    # Gerar recomendações
    recommendations = generate_recommendations(persona, submission.answers)
    
    # Determinar ações
    next_actions = get_next_actions(persona)
    
    # Determinar caminho de monetização
    monetization_path = determine_monetization(persona, submission.answers)
    
    # TODO: Salvar no banco de dados
    
    return FunnelResult(
        score=score,
        persona=persona,
        recommendations=recommendations,
        next_actions=next_actions,
        monetization_path=monetization_path
    )

# ============================================
# BUSINESS LOGIC
# ============================================

def calculate_score(answers: List[Answer]) -> int:
    """Calcula score baseado nas respostas"""
    base_score = 50
    for answer in answers:
        # Lógica de scoring (simplificada)
        base_score += 10
    return min(base_score, 100)

def determine_persona(group: str, answers: List[Answer]) -> str:
    """Determina persona baseada no grupo e respostas"""
    
    personas = {
        "investor": {
            "Seed/Angel (< $500k)": "Angel Investor",
            "Series A ($500k - $5M)": "VC Investor",
            "Series B+ (> $5M)": "Institutional Investor",
            "Fundo de impacto/ESG": "Impact Investor",
        },
        "enterprise": {
            "Startup (< 50)": "Startup",
            "Média empresa (50-500)": "Mid-Market",
            "Enterprise (> 500)": "Enterprise",
            "Governo/ONG": "Public Sector",
        },
        "developer": {
            "Backend/APIs": "Backend Developer",
            "Frontend/UX": "Frontend Developer",
            "ML/AI": "AI Engineer",
            "Pesquisa acadêmica": "Researcher",
        },
        "community": {
            "Iniciante": "Beginner",
            "Intermediário": "Intermediate",
            "Avançado": "Advanced",
            "Professor/Educador": "Educator",
        },
    }
    
    # Simplificado: usar primeira resposta
    if answers and group in personas:
        first_answer = answers[0].answer
        return personas[group].get(first_answer, f"{group.capitalize()} User")
    
    return f"{group.capitalize()} User"

def generate_recommendations(persona: str, answers: List[Answer]) -> List[str]:
    """Gera recomendações personalizadas"""
    
    recommendations_map = {
        "Impact Investor": [
            "Revise nossas métricas de impacto social e ESG",
            "Conheça nossos casos de uso em saúde, educação e inclusão",
            "Agende uma conversa com nosso time de impacto",
        ],
        "VC Investor": [
            "Receba nosso pitch deck com projeções financeiras",
            "Analise nossa tração e crescimento de mercado",
            "Conheça nosso roadmap de produto e expansão",
        ],
        "Enterprise": [
            "Explore nossa API de certificação ética",
            "Solicite uma demo personalizada",
            "Receba proposta comercial para licenciamento",
        ],
        "Backend Developer": [
            "Contribua com código e participe de bounties",
            "Explore nossa arquitetura em Rust e Python",
            "Junte-se à nossa comunidade no GitHub",
        ],
    }
    
    return recommendations_map.get(persona, [
        "Explore nossa documentação completa",
        "Participe da comunidade Symbeon",
        "Entre em contato para mais informações",
    ])

def get_next_actions(persona: str) -> List[NextAction]:
    """Retorna ações disponíveis para a persona"""
    
    actions_map = {
        "Impact Investor": [
            NextAction(action="send_pitch_deck", label="Receber Pitch Deck ESG"),
            NextAction(action="show_wallet", label="Ver Wallet para Doação"),
            NextAction(action="schedule_call", label="Agendar Conversa"),
        ],
        "VC Investor": [
            NextAction(action="send_pitch_deck", label="Receber Pitch Deck Completo"),
            NextAction(action="financial_projections", label="Ver Projeções Financeiras"),
            NextAction(action="schedule_call", label="Agendar Due Diligence"),
        ],
        "Enterprise": [
            NextAction(action="api_docs", label="Ver Documentação da API"),
            NextAction(action="request_demo", label="Solicitar Demo"),
            NextAction(action="commercial_proposal", label="Receber Proposta Comercial"),
        ],
        "Backend Developer": [
            NextAction(action="github_repo", label="Ver Repositório no GitHub"),
            NextAction(action="bounties", label="Ver Bounties Disponíveis"),
            NextAction(action="join_community", label="Entrar na Comunidade"),
        ],
    }
    
    return actions_map.get(persona, [
        NextAction(action="contact", label="Entrar em Contato"),
        NextAction(action="docs", label="Explorar Documentação"),
    ])

def determine_monetization(persona: str, answers: List[Answer]) -> str:
    """Determina caminho de monetização ideal"""
    
    monetization_map = {
        "Impact Investor": "donation_crypto",
        "VC Investor": "equity_investment",
        "Angel Investor": "donation_crypto",
        "Enterprise": "certification_api",
        "Mid-Market": "licensing",
        "Startup": "free_tier",
        "Backend Developer": "bounties",
        "AI Engineer": "bounties",
        "Researcher": "collaboration",
        "Beginner": "free_courses",
        "Advanced": "paid_courses",
        "Educator": "partnership",
    }
    
    return monetization_map.get(persona, "free_tier")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


