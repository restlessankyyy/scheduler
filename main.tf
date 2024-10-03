# main.tf

variable "project_id" {
  description = "The GCP project ID"
  type        = string
}

variable "region" {
  description = "The GCP region"
  type        = string
}

provider "google" {
  project = var.project_id
  region  = var.region
  credentials = var.  # replace this for local use
}

resource "google_cloud_run_service" "my_service" {
  name     = "scheduler"
  location = var.region

  template {
    spec {
      containers {
        image = var.image_url
        ports {
          container_port = 8080
        }
        env {
          name  = "COSMOS_DB_ENDPOINT"
          value = var.cosmos_db_endpoint
        }
        env {
          name  = "COSMOS_DB_KEY"
          value = var.cosmos_db_key
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location    = google_cloud_run_service.my_service.location
  service     = google_cloud_run_service.my_service.name
  policy_data = data.google_iam_policy.noauth.policy_data
}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = ["allUsers"]
  }
}
