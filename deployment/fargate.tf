resource "aws_cloudwatch_log_group" "backend_log_group" {
  name              = "/ecs/backend-task"
  retention_in_days = 7
}

resource "aws_ecs_task_definition" "backend_task" {
    family = "backend-task"

    container_definitions = <<DEFINITION
    [
        {
            "name": "backend-task",
            "image": "${aws_ecr_repository.ecr_repo.repository_url}",
            "essential": true,
            "memory": 1024,
            "cpu": 256,
            "portMappings": [
                {
                    "containerPort": 4000,
                    "hostPort": 4000
                }
            ],
            "environment": [
                {
                    "name": "NODE_ENV",
                    "value": "development"
                },
                {
                    "name": "PORT",
                    "value": "4000"
                },
                {
                    "name": "DATABASE_URL",
                    "value": "postgres://postgres@postgres/pulse_dev"
                }
            ],
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                    "awslogs-group": "${aws_cloudwatch_log_group.backend_log_group.name}",
                    "awslogs-region": "eu-west-1",
                    "awslogs-stream-prefix": "ecs"
                }
            }
        }
    ]
    DEFINITION
    runtime_platform {
        operating_system_family = "LINUX"
        cpu_architecture        = "ARM64"
    }
    requires_compatibilities    = ["FARGATE"]
    network_mode                = "awsvpc"
    memory                      = 1024
    cpu                         = 256
    execution_role_arn          = "${aws_iam_role.ecs_role.arn}"
}

resource "aws_ecs_service" "backend_service" {
    name = "backend_service"

    cluster = "${aws_ecs_cluster.backend_cluster.id}"
    task_definition = "${aws_ecs_task_definition.backend_task.arn}"

    launch_type = "FARGATE"
    desired_count = 3

    network_configuration {
        subnets = [
            "${aws_default_subnet.default_subnet_a.id}",
            "${aws_default_subnet.default_subnet_b.id}",
            "${aws_default_subnet.default_subnet_c.id}"
        ]
        #subnets = ["${aws_subnet.public_a.id}", "${aws_subnet.public_b.id}"]
        security_groups = ["${aws_security_group.service_security_group.id}"]
        assign_public_ip = true
    }

    load_balancer {
        target_group_arn = "${aws_lb_target_group.target_group.arn}"
        container_name = "${aws_ecs_task_definition.backend_task.family}"
        container_port = 4000
    }
}

resource "aws_alb" "application_load_balancer" {
    name = "test-lb-tf"
    load_balancer_type = "application"

    subnets = [
        "${aws_default_subnet.default_subnet_a.id}",
        "${aws_default_subnet.default_subnet_b.id}",
        "${aws_default_subnet.default_subnet_c.id}"
    ]
    security_groups = ["${aws_security_group.load_balancer_security_group.id}"]
}

resource "aws_security_group" "load_balancer_security_group" {
    ingress {
        from_port = 80
        to_port = 80
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

resource "aws_lb_target_group" "target_group" {
    name = "target-group"
    port = 80
    protocol = "HTTP"
    target_type = "ip"
    vpc_id = "${aws_default_vpc.default_vpc.id}"
    health_check {
        matcher = "200,301,302,401"
        path = "/"
    }
}

resource "aws_lb_listener" "listener" {
    load_balancer_arn = "${aws_alb.application_load_balancer.arn}"
    port = "80"
    protocol = "HTTP"
    default_action {
        type = "forward"
        target_group_arn = "${aws_lb_target_group.target_group.arn}"
    }
}

resource "aws_security_group" "service_security_group" {
    ingress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        security_groups = ["${aws_security_group.load_balancer_security_group.id}"]
    }

    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}
