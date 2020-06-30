import Ensolarado from '../assets/ensolarado.png';
import Nublado from '../assets/nublado.png';
import Limpo from '../assets/limpo.png';
import Chuva from '../assets/chuva.png';
import Tempestades from '../assets/tempestades.png';
import Neve from '../assets/neve.png';
import Ventos from '../assets/ventos.png';

export default (weather) => {
  switch(weather) {
    case "Ensolarado":
      return Ensolarado;
    case "Nublado":
      return Nublado;
    case "Limpo":
      return Limpo;
    case "Chuva":
      return Chuva;
    case "Tempestades":
      return Tempestades;
    case "Neve":
      return Neve;
    case "Ventos Fortes":
      return Ventos;
  }
}