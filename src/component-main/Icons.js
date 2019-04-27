import { library } from '@fortawesome/fontawesome-svg-core'

import {
  faExclamationTriangle,
  faArrowRight,
  faArrowLeft,
  faSignInAlt,
  faPencilAlt,
  faUserPlus,
  faTrashAlt,
  faSearch,
  faTimes,
  faCheck,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'

const Icons = () => {
  library.add(faExclamationTriangle)
  library.add(faArrowRight)
  library.add(faPencilAlt)
  library.add(faArrowLeft)
  library.add(faSignInAlt)
  library.add(faTrashAlt)
  library.add(faUserPlus)
  library.add(faSearch)
  library.add(faTimes)
  library.add(faCheck)
  library.add(faPlus)
}

export default Icons
