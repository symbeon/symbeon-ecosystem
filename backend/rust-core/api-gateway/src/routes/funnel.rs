use axum::{
    extract::{Path, State},
    Json,
};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use crate::state::AppState;
use crate::error::AppError;

#[derive(Debug, Serialize)]
pub struct Question {
    pub id: String,
    pub text: String,
    pub options: Vec<String>,
    pub level: i32,
    pub group: String,
}

#[derive(Debug, Deserialize)]
pub struct FunnelSubmission {
    pub user_id: String,
    pub group: String,
    pub answers: serde_json::Value,
    pub email: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct FunnelResult {
    pub score: i32,
    pub persona: String,
    pub recommendations: Vec<String>,
    pub next_actions: Vec<NextAction>,
    pub monetization_path: String,
}

#[derive(Debug, Serialize)]
pub struct NextAction {
    pub action: String,
    pub label: String,
}

pub async fn get_questions(
    State(_state): State<Arc<AppState>>,
    Path(group): Path<String>,
) -> Result<Json<Vec<Question>>, AppError> {
    // TODO: Retornar árvore de perguntas para o grupo
    // Grupos: developer, investor, enterprise, community
    
    match group.as_str() {
        "developer" | "investor" | "enterprise" | "community" => {
            // Retornar perguntas do grupo
            Ok(Json(vec![]))
        }
        _ => Err(AppError::NotFound),
    }
}

pub async fn submit_funnel(
    State(_state): State<Arc<AppState>>,
    Json(_payload): Json<FunnelSubmission>,
) -> Result<Json<FunnelResult>, AppError> {
    // TODO: Processar respostas do funil
    // 1. Calcular score
    // 2. Determinar persona
    // 3. Gerar recomendações
    // 4. Salvar no banco
    // 5. Retornar resultado
    
    Err(AppError::InternalError("Not implemented yet".to_string()))
}

