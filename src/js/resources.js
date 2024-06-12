import { ImageSource, Sound, Resource, Loader } from 'excalibur'

const Resources = {
    // Fish: new ImageSource('./images/fish.png'),
    Player: new ImageSource('./placeholders/mc-idle.png')
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }