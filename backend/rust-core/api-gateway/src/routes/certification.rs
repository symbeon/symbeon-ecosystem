use axum::{
    extract::{Path, State},
    Json,
};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use crate::state::AppState;
use crate::error::AppError;

#[derive(Debug, Deserialize)]
pub struct CertificationRequest {
    pub organization_name: String,
    pub project_name: String,
    pub compliance_requirements: Vec<String>,
    pub project_description: String,
    pub contact_email: String,
}

#[derive(Debug, Serialize)]
pub struct CertificationResponse {
    pub request_id: String,
    pub estimated_timeline: String,
    pub estimated_cost: f64,
    pub next_steps: Vec<String>,
}

#[derive(Debug, Serialize)]
pub struct CertificateVerification {
    pub is_valid: bool,
    pub certificate_id: String,
    pub organization: String,
    pub project_name: String,
    pub compliance_level: String,
    pub issue_date: String,
    pub expiry_date: String,
}

pub async fn request_certification(
    State(_state): State<Arc<AppState>>,
    Json(_payload): Json<CertificationRequest>,
) -> Result<Json<CertificationResponse>, AppError> {
    // TODO: Implementar
    Err(AppError::InternalError("Not implemented yet".to_string()))
}

pub async fn verify(
    State(_state): State<Arc<AppState>>,
    Path(_certificate_id): Path<String>,
) -> Result<Json<CertificateVerification>, AppError> {
    // TODO: Verificar certificado no blockchain
    Err(AppError::NotFound)
}

pub async fn get_status(
    State(_state): State<Arc<AppState>>,
    Path(_request_id): Path<String>,
) -> Result<Json<serde_json::Value>, AppError> {
    // TODO: Buscar status do request
    Err(AppError::NotFound)
}


