import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Heading,
  Text,
  Divider,
  CardFooter,
  Button,
  CardHeader,
  Flex,
  Avatar,
  Box,
  IconButton,
  GridItem,
} from "@chakra-ui/react";
import {

  Popover,

  PopoverTrigger,

  PopoverContent,

  PopoverHeader,

  PopoverBody,

  PopoverFooter,

  PopoverArrow,

  PopoverCloseButton,

} from "@chakra-ui/react"
import { Grid } from "@chakra-ui/react";
import "./Theater.css";
import UpdateTheater from "./UpdateTheater";
import DeleteTheater from "./DeleteTheater";

// Modal

function Theater(props) {

  return (
    <div className="Theaters">
      <Card maxW="lg" align="center" border="1px solid black">
        <CardHeader align="left">
          <Flex spacing="4">
            <Flex flex="1" gap="10" alignItems="center" flexWrap="wrap">
              <Avatar name="Segun Adebayo" src={props.logo} />

              <Box>
                <Heading size="sm">{props?.TheaterName}</Heading>
                <Text>{props?.TheaterDesc}</Text>
              </Box>
            </Flex>
            <DeleteTheater TheaterName={props?.TheaterName}/>
          </Flex>
        </CardHeader>
        <Divider orientation="horizontal" width="80%" />
        <Popover>
        <CardBody>
          {props?.TheaterDetailsOnCard}
          <p>
            <PopoverTrigger>
              <Button>
                View More
              </Button>
            </PopoverTrigger>
          </p>
          <PopoverContent color="white" bg="blue.800" borderColor="blue.800">

              <PopoverHeader pt={4} fontWeight="bold" border="0">

                Address

              </PopoverHeader>

              <PopoverArrow />

              <PopoverCloseButton />

              <PopoverBody>

                {props?.TheaterDetails}

              </PopoverBody>

              <PopoverFooter

                border="0"

                d="flex"

                alignItems="center"

                justifyContent="space-between"

                pb={4}

              >



              </PopoverFooter>

            </PopoverContent>
        </CardBody>
        </Popover>

        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "50px",
            },
          }}
          gap={2}
        >
          <Button
            flex="1"
            variant="ghost"
            className="BuyTicket"
            bg="#EB4E62"
            color="white"
            borderRadius="30px"
          >
            Buy Tickets
          </Button>

          {props?.userType == "ADMIN" ? <UpdateTheater /> : null}
        </CardFooter>
      </Card>

      {/* Modal */}
    </div>
  );
}

export default Theater;
