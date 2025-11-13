use axum::{
    extract::{Path, State},
    Json,
};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use crate::state::AppState;
use crate::error::AppError;

#[derive(Debug, Deserialize)]
pub struct CreateInvoiceRequest {
    pub amount: f64,
    pub currency: String,
    pub payment_type: String,
    pub metadata: Option<serde_json::Value>,
}

#[derive(Debug, Serialize)]
pub struct InvoiceResponse {
    pub invoice_id: String,
    pub amount: f64,
    pub currency: String,
    pub wallet_address: Option<String>,
    pub payment_url: Option<String>,
    pub expires_at: String,
}

#[derive(Debug, Serialize)]
pub struct WalletAddress {
    pub currency: String,
    pub address: String,
    pub qr_code_url: String,
}

pub async fn create_invoice(
    State(_state): State<Arc<AppState>>,
    Json(_payload): Json<CreateInvoiceRequest>,
) -> Result<Json<InvoiceResponse>, AppError> {
    // TODO: Criar invoice para pagamento
    Err(AppError::InternalError("Not implemented yet".to_string()))
}

pub async fn get_wallet_address(
    State(_state): State<Arc<AppState>>,
    Path(currency): Path<String>,
) -> Result<Json<WalletAddress>, AppError> {
    // TODO: Retornar endereço da wallet para a moeda
    
    let address = match currency.to_uppercase().as_str() {
        "ETH" => "0x...", // TODO: Endereço real
        "MATIC" => "0x...",
        "USDC" => "0x...",
        "BTC" => "bc1...",
        _ => return Err(AppError::BadRequest("Unsupported currency".to_string())),
    };
    
    Ok(Json(WalletAddress {
        currency: currency.to_uppercase(),
        address: address.to_string(),
        qr_code_url: format!("https://api.qrserver.com/v1/create-qr-code/?data={}", address),
    }))
}

pub async fn verify_payment(
    State(_state): State<Arc<AppState>>,
    Path(_tx_hash): Path<String>,
) -> Result<Json<serde_json::Value>, AppError> {
    // TODO: Verificar pagamento no blockchain
    Err(AppError::InternalError("Not implemented yet".to_string()))
}


