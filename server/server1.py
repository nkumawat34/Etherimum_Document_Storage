from flask import Flask,request
from flask_cors import CORS

app = Flask(__name__)
import qrcode
import requests
import face_recognition
import cv2
import os
import jsonify

import fitz  # PyMuPDF
import os
from io import BytesIO
# Specify the allowed origin
#they are used for send data from server to client and client to server.They are highly used for api's callings
cors=CORS(app)

@app.route('/', methods = ['GET', 'POST']) 
def home(): 
    if(request.method == 'GET'): 
  
        data = "hello world"
        return data

@app.route('/myfunction', methods=['GET'])
def hello():
    # Access query parameters
    document_cid = request.args.get('document_cid')
    document_name = request.args.get('document_name')
    print(document_cid,document_name)
    # Check if the parameters are present
   

    # Your code to process the query parameters goes here
    result = my_function(document_cid+".ipfs.w3s.link"+"/"+document_name)

    # Return a response
    return "Done"

def my_function(url):
  
  # Replace this with your IPFS CID
  ipfs_cid = url
  
  # Create a QR code
  qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)
  qr.add_data(ipfs_cid)
  qr.make(fit=True)

  # Create an image of the QR code
  img = qr.make_image(fill_color="black", back_color="white")

  # Save or display the image
  img.save("IPFS"+".png")  # Save the image to a file
  img.show()  # Display the image
  return "Done"




@app.route('/liveface', methods=['GET'])
def live_face():
  document_cid = request.args.get('param1')
  document_name = request.args.get('param2')
  print(document_cid)
  # URL of the image you want to compare against
  
  image_url = "https://ipfs.io/ipfs/"
  image_url+=str(document_cid)
  image_url+='/'
  image_url+=str(document_name)
  print(image_url)
# Download the image from the URL
  response = requests.get(image_url)
  
  known_image = face_recognition.load_image_file(BytesIO(response.content))
  known_face_encoding = face_recognition.face_encodings(known_image)[0]

  # Initialize the webcam
  cap = cv2.VideoCapture(0)
  flag=0
  while True:
    ret, frame = cap.read()

    if not ret:
        print("Error reading the webcam feed.")
        break

    # Find face locations in the live frame
    face_locations = face_recognition.face_locations(frame)
    
    if len(face_locations) > 0:
        # Encode the live face
        live_face_encoding = face_recognition.face_encodings(frame, face_locations)[0]

        # Compare the live face to the known face
        results = face_recognition.compare_faces([known_face_encoding], live_face_encoding)

        if results[0]:
            print("Match found! The live face matches the known face.")
            flag=1
            break
            
        else:
            print("No match found. The live face does not match the known face.")
            

    cv2.imshow('Live Face Comparison', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
  if flag==1: 
    return "Yes"
  else:
    return "No"       
  cap.release()
  cv2.destroyAllWindows()

if __name__ == '__main__':  
   app.run()