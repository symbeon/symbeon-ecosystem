use sqlx::PgPool;

#[derive(Clone)]
pub struct AppState {
    pub db: PgPool,
    // Adicionar outros serviços conforme necessário
    // pub blockchain: Arc<BlockchainBridge>,
    // pub redis: RedisPool,
}


