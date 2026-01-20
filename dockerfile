FROM node:20.20

WORKDIR /react-app

COPY . .

# Install dependencies without audit and fund msg to speed up the build process
# and prefer offline mode to use cached packages.   
RUN npm install --no-audit --no-fund --prefer-offline

EXPOSE 3000

# run local development server
CMD ["npm", "start"]

# build the pages
# CMD ["npm", "run", "build"]