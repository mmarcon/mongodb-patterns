FROM gitpod/workspace-base:2022-09-07-02-19-02

# Install MongoDB Tooling
RUN sudo apt-get install gnupg
RUN wget -qO - https://pgp.mongodb.com/server-5.0.asc | sudo apt-key add -
RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
RUN sudo apt-get update
RUN sudo apt-get install -y mongodb-atlas

USER gitpod
COPY --chown=gitpod:gitpod gitpod-config/nvm-lazy.sh /home/gitpod/.nvm/nvm-lazy.sh

# Install nvm/node
# Copy-pasted from https://github.com/gitpod-io/workspace-images/blob/481f7600b725e0ab507fbf8377641a562a475625/chunks/lang-node/Dockerfile
RUN curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | PROFILE=/dev/null bash \
    && bash -c ". .nvm/nvm.sh \
    && nvm install v18 \
    && nvm alias default v18 \
    && echo ". ~/.nvm/nvm-lazy.sh"  >> /home/gitpod/.bashrc.d/50-node

ENV PATH=/home/gitpod/.nvm/versions/node/v${NODE_VERSION}/bin:$PATH