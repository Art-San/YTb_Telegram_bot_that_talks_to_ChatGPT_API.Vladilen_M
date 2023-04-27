build:
  docker build -t bottelgpt .

run:
  docker run -d -p 3000:3000 --name bottelgpt --rm bottelgpt
