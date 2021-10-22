export appName = "TODO"
export rgName = "$appName"
export storageName = "$appName"
export location = "westus"

az group create --name $rgName --location $location
az storage account create --name $storageName --location $location --resource-group $rgName --sku Standard_LRS 
az functionapp create --resourcegroup $rgName --consumption-plan-location $location --runtime node --runtime-version 14 --functions-version 4 --name $appName --storage-account $storageName