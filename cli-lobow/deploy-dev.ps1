# importo modulo donde estan variables
Import-Module config_var
$version = $config_var:VERSION_APP_ENGINE_DEFAULT_DEV

# Ingresa el archivo yaml de la aplicación
$yaml = $config_var:YAML_DEV

# Despliega la aplicación
gcloud app deploy $yaml --version=$version --promote