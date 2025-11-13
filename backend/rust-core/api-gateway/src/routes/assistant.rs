use axum::{
    extract::State,
    Json,
};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use crate::state::AppState;
use crate::error::AppError;

#[derive(Debug, Deserialize)]
pub struct ChatRequest {
    pub user_id: String,
    pub message: String,
    pub context: Option<serde_json::Value>,
}

#[derive(Debug, Serialize)]
pub struct ChatResponse {
    pub response: String,
    pub sources: Vec<Source>,
    pub suggestions: Vec<String>,
}

#[derive(Debug, Serialize)]
pub struct Source {
    pub title: String,
    pub url: String,
    pub relevance: f32,
}

pub async fn chat(
    State(_state): State<Arc<AppState>>,
    Json(_payload): Json<ChatRequest>,
) -> Result<Json<ChatResponse>, AppError> {
    // TODO: Implementar chat com AI assistant
    // Este endpoint faz proxy para o serviço Python (ai-assistant)
    
    Err(AppError::InternalError("Not implemented yet".to_string()))
}
