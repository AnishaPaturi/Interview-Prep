const cloudDevopsData = {
  "Cloud & DevOps": {
    icon: "ti-cloud",
    color: "#185FA5",
    topics: {
      "Docker": {
        explanation: "Docker packages applications in containers — lightweight, portable environments that include everything needed to run the application.",
        details: [
          "Container: running instance of an image",
          "Image: read-only template built from a Dockerfile",
          "Dockerfile: instructions to build an image",
          "Docker Hub: public registry for images"
        ],
        example: `# Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "app.py"]

# Build & run
docker build -t myapp:latest .
docker run -p 8080:8000 myapp:latest

# Common commands
docker ps / docker ps -a      # list containers
docker images                 # list images
docker exec -it <id> bash     # enter container
docker logs <id>              # view logs`
      },
      "CI/CD": {
        explanation: "CI/CD automates the process of integrating code changes, running tests, and deploying to production.",
        details: [
          "CI: automatically build and test on every commit",
          "CD: automatically deploy after tests pass",
          "Tools: GitHub Actions, Jenkins, GitLab CI, CircleCI",
          "Benefits: faster releases, catch bugs early, consistent deployments"
        ],
        example: `# .github/workflows/main.yml
name: CI/CD
on: push

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: pip install -r requirements.txt
      - run: pytest tests/

  deploy:
    needs: test    # only if tests pass
    runs-on: ubuntu-latest
    steps:
      - run: docker build -t app . && docker push registry/app
      - run: kubectl rollout restart deployment/app`
      }
    }
  }
};

export default cloudDevopsData;
