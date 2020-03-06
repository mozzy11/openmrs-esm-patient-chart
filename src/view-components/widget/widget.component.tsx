import React, { FunctionComponent } from "react";
import { widgetDefinitions as coreWidgetDefinitions } from "../core-views";

export default function Widget(props) {
  const [widget, setWidget] = React.useState(null);

  React.useEffect(() => {
    loadWidgetFromConfig(props.widgetConfig);
  }, [props.widgetConfig]);

  function loadWidgetFromConfig(widgetConfig: WidgetConfig) {
    let Component: FunctionComponent;
    let widget: WidgetConfig = widgetConfig;
    if (widgetConfig.esModule) {
      System.import(widgetConfig.esModule)
        .then(module => {
          if (module[widgetConfig.name]) {
            Component = module[widgetConfig.name];
            widget.component = () => <Component />;
          } else {
            widget.component = () => (
              <div>
                {widgetConfig.name} does not exist in module{" "}
                {widgetConfig.esModule}
              </div>
            );
          }
        })
        .catch(error => {
          widget.component = () => <div>{widget.esModule} failed to load</div>;
        })
        .finally(() => {
          setWidget(widget);
        });
    } else {
      widget.component = () => (
        <div>No module provided in the config for widget: {widget.name}></div>
      );
      setWidget(widget);
    }
  }

  return (
    <>
      {widget != undefined &&
        widget.component != undefined &&
        widget.component()}
    </>
  );
}

export type WidgetProps = {
  widgetConfig: WidgetConfig;
};

type GridSize = {
  gridRow: string;
  gridColumn: string;
};

export type WidgetConfig = {
  name: string;
  esModule?: string;
  layout?: {
    rowSpan?: number;
    columnSpan?: number;
  };
  component?: Function;
};

type ComponentProps = {
  props: any;
};
