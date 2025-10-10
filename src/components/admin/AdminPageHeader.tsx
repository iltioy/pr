import {
    Button,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import {
    CAHRT_GLOBAL_ALBUMS_NAME,
    CAHRT_GLOBAL_CATEGORIES_NAME,
    CAHRT_GLOBAL_TRENDS_NAME,
} from "../../constants/admin";
import { useLocalization } from "../../contexts/LocalizationContext";

interface AdminPageSelectProps {
    title: string;
    defaultValue: string;
}

const AdminPageHeader = observer(
    ({ title, defaultValue }: AdminPageSelectProps) => {
        const navigate = useNavigate();
        const [value, setValue] = useState(defaultValue);
        const { t } = useLocalization();

        const handleChange = (e: SelectChangeEvent<string>) => {
            if (e.target.value !== defaultValue) {
                navigate(`/admin/${e.target.value}`);
            }
        };

        return (
            <>
                <Stack
                    flexDirection="row"
                    marginBottom="10px"
                    alignItems="center"
                >
                    <Typography variant="h4" marginRight="auto">
                        {title}
                    </Typography>

                    <FormControl
                        variant="standard"
                        sx={{ m: 1, minWidth: 120 }}
                    >
                        <Select
                            label="admin-page"
                            value={value}
                            onChange={(e) => handleChange(e)}
                            disableUnderline
                        >
                            <MenuItem value={CAHRT_GLOBAL_CATEGORIES_NAME}>
                                {t('categories')}
                            </MenuItem>
                            <MenuItem value={CAHRT_GLOBAL_TRENDS_NAME}>
                                {t('trends')}
                            </MenuItem>
                            <MenuItem value={CAHRT_GLOBAL_ALBUMS_NAME}>
                                {t('albums')}
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
                <hr />
            </>
        );
    }
);

export default AdminPageHeader;
