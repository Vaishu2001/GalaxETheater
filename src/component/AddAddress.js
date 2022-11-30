import React from "react";
import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
function AddAddress(props) {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="10%"
      backdropBlur="2px"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { isOpen1, onToggle } = useDisclosure();
  const [addressLine1, setaddressLine1] = useState("");
  const [addressLine2, setaddressLine2] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [pincode, setpincode] = useState("");
  const [country, setcountry] = useState("");

  const submitfunctiontorow = () => {
    const details = JSON.parse(localStorage.getItem("data"));
    console.log(details);
    const address = {
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      country,
    };
    console.log(address);

    const userdata = {
      code: details.code,
      name: details.name,
      imgUrl: details.imgUrl,
      address: address,
    };

    console.log(userdata);

    localStorage.setItem("Theateraddresses", JSON.stringify(userdata));
  };
  const [validAddress,setvalidAddress]=useState(false);
  const validateAddressDetails=()=>{
    var pincodeRE= /^[1-9]{1}[0-9]{2}[0-9]{3}$/;
    
  if(addressLine1==""||addressLine2==""||city==""||state==""||country==""||pincode=="")
  {
  alert("Any field cannot be null");
  }
  else if(addressLine1.length<5 ){
    alert("Enter proper Address 1")
  }
  else if(addressLine2.length<5 ){
    alert("Enter proper Address 2")
  }
  else if(city.length<3 ){
    alert("Enter proper city")
  }
  else if(state.length<3 ){
    alert("Enter proper state")
  }
  else if(!pincodeRE.test(pincode))
  {
    alert("Enter proper pincode");
  }
  else if(country.length<3)
  {
    alert("Enter proper country");
  }
  else{
    setvalidAddress((current)=>!current)
    
  }
  
  }
  const submitter = () => {
    console.log("In address page1"+props.validTheater)
    props.validateTheaterDetails();
    console.log("In address page2"+props.validTheater)
    if(props?.validTheater){
      // console.log("In address page"+props.validTheater)
        onOpen();
        onOpen();
        props.submitfunction();
   }
  };
  const updater = () => {
    validateAddressDetails();
    if(validAddress){
    onClose();
    submitfunctiontorow();
  }
}
  return (
    <div>
      <Button onClick={()=>{submitter()}} colorScheme="blue" mr={3}>
        Add Address
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="10%"
          backdropBlur="2px"
        />
        <Box>
          <ModalContent backgroundColor="#333545" color="white">
            <ModalHeader>Add Address</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Street Address 1</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Street Address 1"
                  type="text"
                  value={addressLine1}
                  onChange={(e) => {
                    setaddressLine1(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Street Address 2</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Street Address 2"
                  type="text"
                  value={addressLine2}
                  onChange={(e) => {
                    setaddressLine2(e.target.value);
                  }}
                />
              </FormControl>

              <Grid templateColumns="repeat(2, 2fr)" gap={8} align="center">
                <GridItem colSpan={1}>
                  <FormControl mt={2} size="xs">
                    <FormLabel>City</FormLabel>
                    <Input
                      placeholder="City"
                      type="text"
                      value={city}
                      onChange={(e) => {
                        setcity(e.target.value);
                      }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                  <FormControl mt={2} size="xs">
                    <FormLabel>State</FormLabel>
                    <Input
                      placeholder="State"
                      type="text"
                      value={state}
                      onChange={(e) => {
                        setstate(e.target.value);
                      }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                  <FormControl mt={2}>
                    <FormLabel>Pincode</FormLabel>
                    <Input
                      placeholder="Pincode"
                      type="number"
                      value={pincode}
                      onChange={(e) => {
                        setpincode(e.target.value);
                      }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                  <FormControl mt={2}>
                    <FormLabel>Country</FormLabel>
                    <Input
                      placeholder="Country"
                      type="text"
                      value={country}
                      onChange={(e) => {
                        setcountry(e.target.value);
                      }}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
            </ModalBody>

            <ModalFooter>
              <Button onClick={updater} colorScheme="blue" mr={3}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Box>
      </Modal>
    </div>
  );
}

export default AddAddress;
