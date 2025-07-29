.PHONY: build deps start dev clean image

# Install dependencies
deps:
	pnpm install

# Build target - install deps and build the project
build: deps
	pnpm run build

# Run the application
run:
	pnpm start

# Start in development mode
dev:
	pnpm run dev

# Build Docker image
image:
	docker build -t checkout-service .

# Clean node_modules
clean:
	rm -rf node_modules 
