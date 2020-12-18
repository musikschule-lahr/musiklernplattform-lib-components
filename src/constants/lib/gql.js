import { gql } from '@apollo/client';

// Idee: Fragments für einzelne Search Filter

// Title + Composer ist freiillig, ohne Angabe gibt es keine Filterung = Alle Elemente
// TODO: Pagination
export const GET_LIB_ELEMENTS = gql`
query FilterLibElements(
  $title: String
){
  filterLibElements(
      filter: {
        title: $title
      }
    )
    {
      idLibElement
      playerPath
      playerType
      isFavorite @client
      instruments{
        idInstrument
        id @client
        name
      }
      tracks{
        title
        isVideo
        filePath
        sorting
      }
      metaData {
        idMetaData
        title
        comment
        movement
        difficultyMin
        difficultyMax
        coverImagePath
        composer {
          idComposer
          firstname
          lastname
          yearOfBirth
          yearOfDeath
        }
        epoch {
          idEpoch
          code
          description
        }
      }
    }
}
`;

export const SEARCH_LIB_ELEMENTS = gql`
query SearchLibElements(
  $text: String
  $difficulty: DifficultyInput
  $instruments: [InstrumentInput]
  $epochs: [EpochInput]
  $sorting: LibElementSortableInput
){
  filterLibElements(
      filter: {
        title: $text
        composer:{
          firstname: $text
          lastname: $text
        }
        comment: $text
        difficulty: $difficulty
        instruments: $instruments
        epochs: $epochs
      }
      sorting: $sorting
    )
    {
      idLibElement
      playerPath
      playerType
      isFavorite @client
      instruments{
        idInstrument
        id @client
        name
      }
      tracks{
        title
        isVideo
        filePath
        sorting
      }
      metaData {
        idMetaData
        title
        comment
        movement
        difficultyMin
        difficultyMax
        coverImagePath
        composer {
          idComposer
          firstname
          lastname
          yearOfBirth
          yearOfDeath
        }
        epoch {
          idEpoch
          code
          description
        }
      }
    }
}
`;

export const GET_LIB_ELEMENT_FROM_PATH = gql`
query GetLibElementFromPath(
  $path: String!
){
  getLibElementFromPath(
      where: {
        pathId: $path
      }
    )
    {
      idLibElement
      playerPath
      playerType
      isFavorite @client
      instruments{
        idInstrument
        id @client
        name
      }
      tracks{
        title
        isVideo
        filePath
        sorting
      }
      metaData {
        idMetaData
        title
        comment
        movement
        difficultyMin
        difficultyMax
        coverImagePath
        composer {
          idComposer
          firstname
          lastname
          yearOfBirth
          yearOfDeath
        }
        epoch {
          idEpoch
          code
          description
        }
      }
    }
}
`;

export const GET_EPOCHS = gql`
query GetEpochs{
  getEpochs
    {
          idEpoch
          code
          description
          selected @client
    }
}
`;

export default {
  GET_LIB_ELEMENTS, SEARCH_LIB_ELEMENTS, GET_LIB_ELEMENT_FROM_PATH, GET_EPOCHS,
};
