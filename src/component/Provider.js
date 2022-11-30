import {
  ChakraProvider,
  Grid,
  GridItem,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Header from "../component/Header";
import Theater from "../component/Theater";
import Filter from "../component/Filter";
import Footer from "../component/Footer";
import logo from "../images/Logo.png";
import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import AddTheater from "./AddTheater";

function Provider() {
  var name = "Samarth";
  var userType = "ADMIN";
  // var userType = "USER";
  var TheaterName = "GalaxE Movie Theater";
  var TheaterDesc = "4DX, Nexus (Formerly Forum), Koramangala";
  var TheaterDetails =
    "Nexus Mall, 21-22, Adugodi Main Road, Koramangala, Chikku Lakshmaiah Layout, Bengaluru, Karnataka 560095, India";
  const [APIdata, setAPIdata] = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [value, setValue] = useState("kiru");
  const [isEmpty, setIsEmpty] = useState(false);
  const [errors, setErrors] = useState();

  // var apiString = "http://localhost:9090/theatre/"+{filterType}+"/"+{value};
  useEffect(() => {
    setAPIdata([]);

    console.log(filterType);

    if (filterType == "All" || filterType == "Filter") {
      axios
        .get("http://localhost:9091/theatre/All")
        .then((response) => {
          if (response.status == "200") {
            console.log(response);
            setAPIdata(response.data);
            setIsEmpty(true);
          }
        })
        .catch(function (error) {
          console.log(error);
          setIsEmpty(false);
          setErrors(error.response.data);
        });
    } else if (filterType == "City") {
      axios
        .get(`http://localhost:9091/theatre/city/${value}`)
        .then((Response) => {
          console.log(Response);
          setAPIdata(Response.data);
          setIsEmpty(true);
        });
    } else if (filterType == "Name") {
      axios
        .get(`http://localhost:9091/theatre/name/${value}`)
        .then((Response) => {
          console.log(Response);
          if (Response.status != 200) {
            alert("name doesnot exist");
          } else {
            setAPIdata(Response.data);
          setIsEmpty(true);

          }
        });
    } else if (filterType == "Address") {
      axios
        .get(`http://localhost:9091/theatre/searchByAddress/${value}`)
        .then((Response) => {
          console.log(Response);
          setAPIdata(Response.data);
          setIsEmpty(true);

        });
    }
  }, [filterType]);

  const SearchFilter = () => {
    console.log("Came back to Provider");
  };

  return (
    <>
      <ChakraProvider>
        <Header name={name} />
        <Filter
          userType={userType}
          setValue={setValue}
          setFilterType={setFilterType}
        />
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={8}
          align="center"
          margin="0% 5%"
        >
          {console.log(APIdata)}
          {isEmpty ? (
            APIdata.map((data) => {
              return (
                <div>
                  <GridItem colSpan={1}>
                    <Theater
                      userType={userType}
                      TheaterName={data.name}
                      TheaterDesc={data.address.addressLine1}
                      TheaterDetails={
                        data.address.addressLine1 +
                        " " +
                        data.address.addressLine2 +
                        " " +
                        data.address.city +
                        " " +
                        data.address.state +
                        " " +
                        data.address.country +
                        " " +
                        data.address.pincode
                      }
                      TheaterDetailsOnCard={
                        data.address.addressLine1 +
                        " " +
                        data.address.addressLine2 +
                        " " +
                        data.address.city
                      }
                      logo={data.imgUrl}
                    />
                  </GridItem>
                </div>
              );
            })
          ) : (
            
              <Alert status="warning" margin="10% 2%">
                <AlertIcon />
                {errors}
              </Alert>
            
          )}
        </Grid>
        <Footer />
      </ChakraProvider>
    </>
  );
}

export default Provider;
