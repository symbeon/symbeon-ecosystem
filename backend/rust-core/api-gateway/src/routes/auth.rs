use axum::{
    extract::State,
    http::StatusCode,
    Json,
};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use crate::state::AppState;
use crate::error::AppError;

#[derive(Debug, Deserialize)]
pub struct RegisterRequest {
    pub email: String,
    pub name: String,
    pub password: String,
    pub wallet_address: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct RegisterResponse {
    pub user_id: String,
    pub email: String,
    pub name: String,
}

#[derive(Debug, Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize)]
pub struct LoginResponse {
    pub token: String,
    pub user: UserData,
}

#[derive(Debug, Serialize)]
pub struct UserData {
    pub id: String,
    pub email: String,
    pub name: String,
    pub wallet_address: Option<String>,
}

pub async fn register(
    State(_state): State<Arc<AppState>>,
    Json(_payload): Json<RegisterRequest>,
) -> Result<Json<RegisterResponse>, AppError> {
    // TODO: Implementar lógica de registro
    // 1. Validar email único
    // 2. Hash da senha
    // 3. Inserir no banco
    // 4. Retornar user_id
    
    Err(AppError::InternalError("Not implemented yet".to_string()))
}

pub async fn login(
    State(_state): State<Arc<AppState>>,
    Json(_payload): Json<LoginRequest>,
) -> Result<Json<LoginResponse>, AppError> {
    // TODO: Implementar lógica de login
    // 1. Buscar usuário por email
    // 2. Verificar senha
    // 3. Gerar JWT
    // 4. Retornar token + user data
    
    Err(AppError::InternalError("Not implemented yet".to_string()))
}

pub async fn get_current_user(
    State(_state): State<Arc<AppState>>,
) -> Result<Json<UserData>, AppError> {
    // TODO: Implementar
    // 1. Extrair JWT do header
    // 2. Validar e decodificar
    // 3. Buscar user no banco
    // 4. Retornar user data
    
    Err(AppError::Unauthorized)
}

