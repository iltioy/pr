import { Grid, Stack, TextField } from "@mui/material";
import { useState } from "react";

interface Props {
    numberOfCells: number;
}

const CodeEntry = ({ numberOfCells }: Props) => {
    const [arr, setArr] = useState<Array<any>>(new Array(numberOfCells).fill(null));

    return (
        <Stack width="100%" alignItems="center" paddingY="5px">
            <Grid
                container
                sx={{
                    justifyContent: "center",
                }}
            >
                {arr.map((el) => (
                    <Grid
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "6px 2px",
                            // border: "1px solid grey",
                            borderRadius: "4px",
                            marginRight: "5px",
                            height: "45px",
                        }}
                        item
                        xs={10 / numberOfCells}
                    >
                        <TextField type="text" />
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
};

export default CodeEntry;
