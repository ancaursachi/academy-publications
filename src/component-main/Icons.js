import { library } from '@fortawesome/fontawesome-svg-core'

import {
  faArrowRight,
  faArrowLeft,
  faSignInAlt,
  faUserPlus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'

const Icons = () => {
  library.add(faArrowRight)
  library.add(faArrowLeft)
  library.add(faUserPlus)
  library.add(faPlus)
  library.add(faSignInAlt)
}

export default Icons
