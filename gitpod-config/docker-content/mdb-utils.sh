function atlas_up() {
  atlas quickstart --default --force --skipSampleData --skipMongosh --clusterName "$GITPOD_WORKSPACE_ID" > /tmp/cluster-info
  username=$(cat /tmp/cluster-info | grep Username | sed 's/.*:\s//')
  password=$(cat /tmp/cluster-info | grep Password | sed 's/.*:\s//')
  connectionstring=$(cat /tmp/cluster-info | grep string | sed 's/.*:\smongodb+srv:\/\///')
  rm /tmp/cluster-info
  MONGODB_CONNECTION_STRING="mongodb+srv://$username:$password@$connectionstring"
  echo "MONGODB_CONNECTION_STRING=${MONGODB_CONNECTION_STRING}" > .env
}

function atlas_down() {
  atlas clusters delete "$GITPOD_WORKSPACE_ID" --force
}

export -f atlas_up
export -f atlas_down