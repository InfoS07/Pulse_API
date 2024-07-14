provider "aws" {
  region  = "eu-west-1"
}

resource "aws_ecr_repository" "ecr_repo" {
    name = "ecr_example_repo"
}

#ECS cluster
resource "aws_ecs_cluster" "backend_cluster" {
    name = "backend_cluster_example_app"
}

/* resource "aws_ecs_cluster" "my_cluster" {
    name = "my-cluster"
} */
