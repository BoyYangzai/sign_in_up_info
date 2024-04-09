"use client";
import { PaletteMode } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import AppAppBar from "../../components/AppAppBar";
import Hero from "../../components/Hero";
import LogoCollection from "../../components/LogoCollection";
import Highlights from "../../components/Highlights";
import Pricing from "../../components/Pricing";
import Features from "../../components/Features";
import Testimonials from "../../components/Testimonials";
import FAQ from "../../components/FAQ";
import Footer from "../../components/Footer";
import getLPTheme from "../getLPTheme";
import { Table, TableColumnsType, TableProps } from "antd";
import { Key, useEffect, useState } from "react";
import { getUserList } from "@/request/table";
import { positionOptions, roleOptions } from "@/constant";

interface ToggleCustomThemeProps {
  showCustomTheme: Boolean;
  toggleCustomTheme: () => void;
}

function ToggleCustomTheme({
  showCustomTheme,
  toggleCustomTheme,
}: ToggleCustomThemeProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100dvw",
        position: "fixed",
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: "background.default",
          "& .Mui-selected": {
            pointerEvents: "none",
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: "20px", mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

interface DataType {
  id: number;
  username: string;
  roles: string;
  position: string;
  age: string;
  gender: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: (a, b) => Number(a.age) - Number(b.age),
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Roles",
    dataIndex: "roles",
    key: "roles",
    filters: roleOptions.map((role) => ({
      text: role,
      value: role,
    })),
    onFilter: (value, record) => record.roles.includes(value as string),
  },
  {
    title: "Position",
    dataIndex: "position",
    key: "position",
    filters: positionOptions.map((position) => ({
      text: position.label,
      value: position.value,
    })),
    onFilter: (value, record) => record.position.includes(value as string),
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    filters: [
      {
        text: "Male",
        value: "Male",
      },
      {
        text: "Female",
        value: "Female",
      },
    ],
    onFilter: (value, record) => record.gender.includes(value as string),
  },
];

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

export default function LandingPage() {
  const [mode, setMode] = useState<PaletteMode>("light");
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const [tableList, setTableList] = useState<DataType[]>([]);

  const getTableList = async () => {
    const { data } = await getUserList();
    setTableList(data.users ?? []);
    console.log("tableList", data);
    return data;
  };
  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  useEffect(() => {
    getTableList();
  }, []);

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />

      <Hero />
      <div className="w-full flex justify-center items-center h-full">
        <Table
          style={{
            width: "80%",
          }}
          columns={columns}
          dataSource={tableList}
          onChange={onChange}
          showSorterTooltip={{ target: "sorter-icon" }}
        />
      </div>
      <Box sx={{ bgcolor: "background.default" }}>
        <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
      <ToggleCustomTheme
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      />
    </ThemeProvider>
  );
}
