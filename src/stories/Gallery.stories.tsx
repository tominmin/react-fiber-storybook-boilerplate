import { ComponentMeta, ComponentStory } from "@storybook/react";
import Gallery from "../components/template/Gallery";

export default {
  title: 'Example/Gallery',
  component: Gallery,
  parameters: {
    layout: 'fullscren'
  }
} as ComponentMeta<typeof Gallery>;

const Template: ComponentStory<typeof Gallery> = (args) => <Gallery/>;

export const Primary = Template.bind({});