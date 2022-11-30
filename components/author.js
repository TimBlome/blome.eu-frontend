import NextImage from "../components/image"

const Author = ({author}) => {
    return(
        <div>
            {author.data.attributes.picture? <NextImage image={author.data.attributes.picture} /> : ''} 
            
            By {author.data.attributes.name}
        </div>
    );
}

export default Author