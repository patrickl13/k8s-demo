# Kubernetes Proof of Concept Demo
A kubernetes proof of concept demo for SOEN 387. In this read me I will describe the steps which I used in the video presentation which you can watch here, as well as some extra information I couldn't fit into the presentation time limit.

## Install Docker for Windows
For my set up I am using Windows 10 Home, since your set up might be different, go [here](https://docs.docker.com/docker-for-windows/install/) and try to find the instructions for your machine. Kubernetes comes with Docker desktop, but you will probably have to enable it in the settings.

## Build and run the project with docker-compose
This step is easy once docker is installed, just run `docker-compose up --build` in the project folder. To test that it works if there are no errors in logs navigate to [localhost:3050](https://localhost:3050)
## Install Kompose
[Kompose](https://github.com/kubernetes/kompose) is a useful command line tool we use to convert our docker-compose.yml file to a kubernetes manifest file. I will show you how to download the binary and add it to your environment variables in Windows.
1. Download the binary [here](https://github.com/kubernetes/kompose/releases/download/v1.22.0/kompose-windows-amd64.exe)
2. Rename the .exe file to kompose.exe, or else you will have to mention the full name of the file explicitly in the command line
3. Create a folder where you will put the binary, I used C:\Users\Patrick\bin, place the .exe file in this folder
4. In the Windows search bar, type "Edit environment variables for your account", click this
5. Navigate to the Advanced tab, at the bottom of the window you will see "Environment Variables..." click this
6. You should see a list of User variables, click "Path" then click "Edit..." 
7. Click "New" and then add the folder location of the binary we created earlier, Click Ok then Apply
8. You're done! At this point we should be able to use the kompose tool from the command line

## Convert the docker-compose.yml file to a kubernetes manifest file with Kompose
To convert the docker-compose.yml file navigate to the project folder and type the following in the command line:<br />
`kompose convert -f docker-compose.yml -o kubemanifests.yaml`

## Tweak our kubemanifest.yaml file to work without errors

There are a few modifications we will need to make to our manifest file for 2 reasons:
1. Our images are being built locally and are not hosted on DockerHub
2. Our nginx service is not exposed by default

 ### *The file included in this repo is already modified but I will detail the changes here.

In kubemanifests.yaml we have to change the image for our containers and change the image pull policy like this: <br />
```
containers:
        - image: topicpresentation_backend
          imagePullPolicy: Never
```

Note that image we are using is the image we have already built with docker-compose earlier, make sure you are using the same image name.

We will also add the following to line 55 `type: LoadBalancer` by setting our web service (nginx server) to type LoadBalancer, it will expose it in the kubernetes cluster.

## Apply the manifest file
Run the following command to apply the manifest file `kubectl apply -f kubemanifests.yaml` this should create some services <br />
If you run `kubectl get pods` you can see if your pods are running <br />
If everything goes well you should be able to see the project running [localhost:3050](https://localhost:3050)
