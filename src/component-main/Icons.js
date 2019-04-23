import { library } from '@fortawesome/fontawesome-svg-core'

import {
  faArrowRight,
  faArrowLeft,
  faSignInAlt,
  faUserPlus,
  faSearch,
  faTimes,
  faCheck,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'

const Icons = () => {
  library.add(faArrowRight)
  library.add(faArrowLeft)
  library.add(faSignInAlt)
  library.add(faUserPlus)
  library.add(faSearch)
  library.add(faTimes)
  library.add(faCheck)
  library.add(faPlus)
}

export default Icons
