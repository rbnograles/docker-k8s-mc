# Kubernetes Examples and Deployments

This directory contains Kubernetes deployment examples and microservices architectures demonstrating various container orchestration patterns and best practices.

## Directory Structure

### `blog-microservices/`

A comprehensive microservices blog application showcasing event-driven architecture and service communication patterns.

**Services:**

- **Client Service** (`client-service-code/`): React frontend for blog interaction
- **Posts Service** (`posts-service-code/`): Handles blog post creation and retrieval
- **Comments Service** (`comments-code/`): Manages comments on blog posts
- **Query Service** (`query-code/`): Aggregates and serves combined data from multiple services
- **Moderation Service** (`moderation-code/`): Handles comment moderation workflows
- **Event Bus** (`event-bus-code/`): Asynchronous communication backbone between services

**Key Concepts Demonstrated:**

- Event-driven microservices architecture
- Service discovery and communication
- Asynchronous messaging patterns
- API Gateway and aggregation services
- Data consistency across services
- Container orchestration with Kubernetes

### `color-rest-api/`

A simple REST API service for managing colors, demonstrating basic Kubernetes deployment patterns.

**Features:**

- CRUD operations for color management
- RESTful API design
- Containerized Node.js application
- Basic Kubernetes deployment manifests

**Key Concepts Demonstrated:**

- Pod deployment
- Service exposure
- Basic Kubernetes resource management
- Container lifecycle in Kubernetes

### `other/`

Additional Kubernetes examples and utilities.

## Getting Started

### Prerequisites

- Kubernetes cluster (Minikube, Kind, Docker Desktop, or cloud provider)
- `kubectl` configured and connected to your cluster
- Docker installed for building images

### Running the Examples

1. **Navigate to the desired example:**

   ```bash
   cd k8s/<example-directory>
   ```

2. **Build and push Docker images (if needed):**

   ```bash
   docker build -t <your-registry>/<image-name>:<tag> .
   docker push <your-registry>/<image-name>:<tag>
   ```

3. **Apply Kubernetes manifests:**

   ```bash
   kubectl apply -f <manifest-files>
   ```

4. **Check deployment status:**

   ```bash
   kubectl get pods
   kubectl get services
   ```

### Blog Microservices Setup

For the blog microservices example:

1. **Deploy all services:**

   ```bash
   cd blog-microservices
   # Apply all service deployments and services
   kubectl apply -f ./
   ```

2. **Access the application:**
   - Find the client service external IP/port
   - Open in browser to interact with the blog

3. **Monitor services:**

   ```bash
   kubectl logs -f <pod-name>
   ```

## Learning Objectives

- Understand microservices architecture patterns
- Learn Kubernetes resource management (Pods, Services, Deployments)
- Explore service communication strategies
- Practice container orchestration in production-like environments
- Gain experience with event-driven systems

## Technologies Used

- **Runtime**: Node.js, Express.js
- **Frontend**: React.js
- **Orchestration**: Kubernetes
- **Communication**: HTTP REST APIs, Event Bus
- **Containerization**: Docker

## Best Practices Demonstrated

- Service isolation and loose coupling
- Event-driven communication
- API versioning and design
- Container optimization
- Resource management
- Observability and logging

## Troubleshooting

- **Pod not starting**: Check logs with `kubectl logs <pod-name>`
- **Service not accessible**: Verify service configuration and port mappings
- **Image pull errors**: Ensure images are built and pushed to accessible registry

## Next Steps

After exploring these examples:

- Experiment with scaling services
- Add monitoring and logging
- Implement service mesh (Istio, Linkerd)
- Explore Helm for package management
- Add CI/CD pipelines for automated deployment
