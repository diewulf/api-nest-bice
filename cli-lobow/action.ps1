$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location -Path $scriptPath
# En este código, $MyInvocation.MyCommand.Definition obtiene la ruta completa del script de PowerShell actual. Luego, 
# Split-Path -Parent extrae el directorio del script, y Set-Location -Path establece el directorio de trabajo del 
# script en ese directorio. Después de hacer esto, las rutas relativas dentro del script se basarán en el directorio
# del script de PowerShell, independientemente de dónde se ejecute el script desde el sistema de archivos.




Import-Module ./gcloud-framework/Main.ps1

$classInstance1 = New-Object Main

do {


    $choice = Read-Host "select options"

    switch ($choice) {
        "1" {
            Write-Output "DEPLOY DEV"
            Invoke-Command -ScriptBlock {. "./deploy-dev.ps1" }
            Read-Host "Enter to continue"
        }
        "2" {
            Write-Output "DEPLOY PROD"
            Invoke-Command -ScriptBlock {. "./deploy-prod.ps1" }
            Read-Host "Enter to continue"
        }
        "3" {
            
            $results = Invoke-Expression "gcloud app versions list"
            # Convertir el objeto a una tabla
        

           

            # Mostrar la tabla
            Write-Host  $results
            Read-Host "Enter to continue"
        }
        default {
            Write-Output "No valid value"
            Read-Host "Enter to continue"
        }
    }
} while ($true)
