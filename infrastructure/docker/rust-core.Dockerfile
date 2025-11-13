# Multi-stage build para Rust
FROM rust:1.75-slim as builder

WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y \
    pkg-config \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy manifests
COPY backend/rust-core/Cargo.toml backend/rust-core/Cargo.lock* ./

# Copy source
COPY backend/rust-core/ .

# Build release
RUN cargo build --release --bin api-gateway

# Runtime stage
FROM debian:bookworm-slim

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    libssl3 \
    && rm -rf /var/lib/apt/lists/*

# Copy binary from builder
COPY --from=builder /app/target/release/api-gateway /app/api-gateway

# Expose port
EXPOSE 8000

# Run
CMD ["/app/api-gateway"]


