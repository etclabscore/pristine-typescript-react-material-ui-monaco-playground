import React, { useState, useRef } from "react";
import { MuiThemeProvider, AppBar, Toolbar, Typography, IconButton, Tooltip, CssBaseline, Grid, Button, Input } from "@material-ui/core"; //tslint:disable-line
import useDarkMode from "use-dark-mode";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import { lightTheme, darkTheme } from "../themes/theme";
import { useTranslation } from "react-i18next";
import LanguageMenu from "./LanguageMenu";
import SplitPane from "react-split-pane";
import Editor from "@monaco-editor/react";

import "./MyApp.css";
import PlayCircle from "@material-ui/icons/PlayCircleFilled";

const MyApp: React.FC = () => {
  const darkMode = useDarkMode();
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [results, setResults] = useState();
  const valueGetter = useRef();

  function handleEditorDidMount(vg: any) {
    setIsEditorReady(true);
    valueGetter.current = vg;
  }

  function handlePlayClick() {
    if (valueGetter) {
      const editorValue = (valueGetter as any).current();
      setResults(editorValue);
    }
  }

  const { t } = useTranslation();
  const theme = darkMode.value ? darkTheme : lightTheme;

  return (
    <MuiThemeProvider theme={theme}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container alignContent="center" alignItems="center" justify="flex-start">
            <Typography variant="h6" style={{ paddingRight: "20px" }}>{t("Pristine")}</Typography>
            <Typography variant="caption" style={{ paddingRight: "5px" }}>
              {t("typescript-react-material-ui-monaco-playground")}
            </Typography>
            <IconButton onClick={handlePlayClick} disabled={!isEditorReady}>
              <PlayCircle />
            </IconButton>
          </Grid>
          <Grid container alignContent="center" alignItems="center" justify="flex-end">
            <LanguageMenu />
            <Tooltip title={t("Toggle Dark Mode")}>
              <IconButton onClick={darkMode.toggle}>
                {darkMode.value ? <Brightness3Icon /> : <WbSunnyIcon />}
              </IconButton>
            </Tooltip>
          </Grid>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <SplitPane split="vertical" minSize={100} maxSize={-100} defaultSize={"35%"} style={{ flexGrow: 1 }}>
        <Editor
          theme={darkMode.value ? "dark" : "light"}
          editorDidMount={handleEditorDidMount}
        />
        <div>
          {results}
        </div>
      </SplitPane>
    </MuiThemeProvider>
  );
};

export default MyApp;
