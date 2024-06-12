import React, { useRef, useState, useEffect } from "react";
import { Container, Box, VStack, Button, HStack } from "@chakra-ui/react";

const colors = ["#000000", "#FF0000", "#FFFF00", "#0000FF", "#FFFFFF"];

const Index = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const draw = (e) => {
      if (e.buttons !== 1) return;
      context.lineWidth = 5;
      context.lineCap = "round";
      context.strokeStyle = color;

      context.lineTo(e.clientX, e.clientY);
      context.stroke();
      context.beginPath();
      context.moveTo(e.clientX, e.clientY);
    };

    const startDrawing = () => {
      context.beginPath();
    };

    const stopDrawing = () => {
      context.closePath();
    };

    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);

    return () => {
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mouseup", stopDrawing);
    };
  }, [color]);

  return (
    <Container maxW="full" p={0} m={0}>
      <Box position="absolute" top={0} left={0} width="100%" height="100%">
        <canvas ref={canvasRef} style={{ display: "block" }} />
      </Box>
      <VStack position="absolute" top={4} left={4} spacing={2}>
        <HStack>
          {colors.map((col) => (
            <Button
              key={col}
              bg={col}
              size="lg"
              onClick={() => setColor(col)}
              border={color === col ? "2px solid #000" : "none"}
            />
          ))}
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;