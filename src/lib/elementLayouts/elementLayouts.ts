import StringElementLayout from "./StringElementLayout.svelte";
import ListElementLayout from "./ListElementLayout.svelte";
import SliderElementLayout from "./SliderElementLayout.svelte";
import MarkdownElementLayout from "./MarkdownElementLayout.svelte";

export const layouts = {
    text: StringElementLayout,
    list: ListElementLayout,
    slider: SliderElementLayout,
    md: MarkdownElementLayout
};