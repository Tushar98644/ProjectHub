import Image from "next/image";
import { ComponentProps } from "react";
import logo from "../../../public/assets/logo.png";

type ImageProps = ComponentProps<typeof Image>;

export const Images = {
    logo: (props: Omit<ImageProps, "src" | "alt">) => <Image src={logo} alt="Logo" {...props} unoptimized priority />,
};
