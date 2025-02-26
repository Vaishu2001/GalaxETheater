import React, { useState } from "react";
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
  Select,
  Button,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import "./SeatStyles.css";

function UpdateSeats(props) {
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
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { isOpen1, onToggle } = useDisclosure();

  const [count1, setCount1] = useState(6);

  const [plusdisabled, setPlusDisabled] = useState(false);
  const [minusdisabled, setMinusDisabled] = useState(false);

  const [name, setname] = useState("");
  const [totalSeats, settotalSeats] = useState(0);
  const [price, setprice] = useState("");
  const [seatType, setseattype] = useState("");
  const [seats, setSeats] = useState();
  const [showNumber, setShowNumber] = useState(false);
  const seatCode = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"];
  var code=null;

  const addrow = () => {
    const row = { code, name, totalSeats, price, seatType };

    if (JSON.parse(localStorage.getItem("array")) == null) {
      localStorage.setItem("array", "[]");
    }
    var olddata = JSON.parse(localStorage.getItem("array"));
    console.log(olddata);
    olddata.push(row);
    localStorage.setItem("array", JSON.stringify(olddata));
  };

  const rowupdation = () => {
    onClose();
    addrow();
    Submitter();
  };

  const handleClick = () => {
    setCount1(6);
  };
  const minusbuttonfunction = () => {
    if (count1 === 6) {
      minusdisabled(true);
    } else {
      setCount1(count1 - 1);
    }
  };
  const plusbuttonfunction = () => {
    if (count1 === 10) {
      plusdisabled(true);
    } else {
      setCount1(count1 + 1);
    }
  };
  const update = () => {
    onOpen();
    props.updateAddRow();
  };
  const Submitter = () => {

    setSeats(() => document.getElementById("SeatNumber").value);
    setShowNumber(true);
  };
  return (
    <div>
      {props.rowAdd <= 15 ? (
        <Button onClick={update} colorScheme="blue" mr={3}>
          Update Rows
        </Button>
      ) : null}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <Box>
          <ModalContent backgroundColor="#333545" color="white">
            <ModalHeader>Update Rows</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Grid templateColumns="repeat(2, 2fr)" gap={8} align="center">
                <GridItem colSpan={1}>
                  <FormControl mt={2} size="xs">
                    <FormLabel>Row Code</FormLabel>
                    <Input 
                    placeholder="Row Code" 
                    type="text" 
                    disabled="true"
                      value={seatCode[props.rowAdd-2]}
                      {...code=seatCode[props.rowAdd-2]}
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                  <FormControl mt={2} size="xs">
                    <FormLabel>Row Name</FormLabel>
                    <Input
                     placeholder="Row Name" 
                     type="text" 
                      value={name}
                      onChange={(e) => {
                        setname(e.target.value);
                      }}
                     />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                  <FormControl mt={2}>
                    <FormLabel>Seat Type</FormLabel>
                    <Select
                    onChange={(e) => {
                        setseattype(e.target.value);
                      }}
                       // defaultValue="Normal"
                    >
                      <option value="Select">Select</option>
                      <option value="PREMIUM">Premium</option>
                      <option value="GOLD">Gold</option>
                      <option value="NORMAL">Normal</option>
                      
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                  <FormControl mt={2}>
                    <FormLabel>Number of Seats in the Row</FormLabel>
                    <Input
                     placeholder="Number of Seats" 
                     type="number" 
                     id="SeatNumber"
                      disabled={showNumber}
                      value={seats}
                      onChange={(e) => {
                        settotalSeats(e.target.value);
                      }}
                     />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl mt={2}>
                    <FormLabel>Price</FormLabel>
                    <Input
                     placeholder="Price"
                     type="number" 
                     value={price}
                      onChange={(e) => {
                        setprice(e.target.value);
                      }}
                     />
                  </FormControl>
                </GridItem>
              </Grid>
            </ModalBody>

            <ModalFooter>
              <Button onClick={rowupdation} colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={handleClick} colorScheme="blue" mr={3}>
                RESET
              </Button>
            </ModalFooter>
          </ModalContent>
        </Box>
      </Modal>
    </div>
  );

}

export default UpdateSeats;
