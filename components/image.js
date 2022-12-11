import { getStrapiMedia } from "../lib/media"
import NextImage from "next/image"

const Image = ({ image, style, fill }) => {
  const { url, alternativeText, width, height } = image?.data?.attributes ?? image.attributes;

  const loader = () => {
    return getStrapiMedia(image)
  }

  return (
    <NextImage
      loader={loader}
      layout="responsive"
      fill={true}
      width={fill ? (width || "100%") : null}
      height={fill? (height || "100%") : null}
      objectFit={fill ? "cover": "contain"}
      src={getStrapiMedia(image)}
      alt={alternativeText || ""}
    />
  )
}

export default Image
