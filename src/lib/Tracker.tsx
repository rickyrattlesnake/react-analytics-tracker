import * as React from "react";
import { render } from "react-dom";

interface TrackerCallConfig {
  eventId: string;
  eventParameters: {
    key: string;
    data: string | string[] | number | boolean;
  };
}

type RenderProp<P> = (
  wrappedProps: { [prop in keyof P]: P[prop] },
) => React.Component;

interface LifecycleHooks {
  componentDidMount?: TrackerCallConfig[];
  componentDidUpdate?: TrackerCallConfig[];
}

interface TrackerProps<P extends PropHooks> {
  lifecycleHooks: LifecycleHooks;
  propHooks: P;
  render: RenderProp<P>;
}

interface PropHooks {
  [prop: string]: TrackerCallConfig[];
}

class Tracker<P extends PropHooks> extends React.Component<
  TrackerProps<P>,
  { generatedPropHooks: any }
> {
  constructor(props: TrackerProps<P>) {
    super(props);

    this.state = { generatedPropHooks: this.generatePropHooks() };
  }

  public componentDidMount() {
    const { lifecycleHooks } = this.props as any;

    if (lifecycleHooks.componentDidMount) {
      lifecycleHooks.componentDidMount.forEach((trackItem: any) => {
        // tslint:disable-next-line:no-console
        console.log("in componentDidMount", trackItem);
      });
    }
  }

  public render() {
    const { generatedPropHooks } = this.state;
    const { render: renderProp } = this.props;

    return renderProp(generatedPropHooks);
  }

  private generatePropHooks() {
    const { propHooks } = this.props;

    return Object.entries(propHooks).map(([prop, trackerItems]) => {});
  }
}

export default Tracker;
