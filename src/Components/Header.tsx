import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { StyledHeader, HeaderContainer } from '../styles/StyledHeader';
import {
  logoRecipesApp, profileIcon,
  receipIcon, searchIcon,
  mealIcon, drinkIcon, logoIcon, doneIcon,
  favoriteIcon, profileYellowIcon } from '../Utils/exportIcons';
import RandomRecipe from './RandomRecipe';

function Header() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [pageIcon, setPageIcon] = useState(mealIcon);
  const [showSearchIcon, setShowSearchIcon] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showProfileIcon, setShowProfileIcon] = useState(true);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleButtonSearch = () => {
    return !showSearchBar ? setShowSearchBar(true) : setShowSearchBar(false);
  };

  const path = (window.location.pathname);
  const pathSplit = path.split('/');

  useEffect(() => {
    switch (pathSplit[1]) {
      case 'meals':
        setTitle('Meals');
        setShowSearchIcon(true);
        setPageIcon(mealIcon);
        setShowProfileIcon(true);
        break;
      case 'drinks':
        setTitle('Drinks');
        setShowSearchIcon(true);
        setPageIcon(drinkIcon);
        setShowProfileIcon(true);

        break;
      case 'profile':
        setTitle('Profile');
        setShowSearchIcon(false);
        setPageIcon(profileYellowIcon);
        setShowProfileIcon(false);
        break;

      case 'done-recipes':
        setTitle('Done Recipes');
        setShowSearchIcon(false);
        setPageIcon(doneIcon);
        setShowProfileIcon(true);
        break;

      case 'favorite-recipes':
        setTitle('Favorite Recipes');
        setShowSearchIcon(false);
        setPageIcon(favoriteIcon);
        setShowProfileIcon(true);
        break;

      default:
        setTitle('Home');
        setShowSearchIcon(false);
        setPageIcon(logoIcon);
        setShowProfileIcon(true);
    }
  }, [title, navigate, pathSplit]);

  return (
    <>
      <StyledHeader>

        <img src={ receipIcon } alt="" />
        <img src={ logoRecipesApp } alt="" />

        {!showProfileIcon ? (
          null
        ) : (
          <button onClick={ handleProfileClick }>
            <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
          </button>
        )}

        {showSearchIcon && (
          <button onClick={ handleButtonSearch }>
            <img src={ searchIcon } alt="searchIcon" data-testid="search-top-btn" />
          </button>
        )}

      </StyledHeader>
      <HeaderContainer>
        <img src={ pageIcon } alt="Title Icon" className="image-header" />
        <h1 data-testid="page-title">
          {title}
        </h1>

        {showSearchBar && (
          <>
            <SearchBar />
            <RandomRecipe />
          </>
        )}
      </HeaderContainer>
    </>

  );
}

export default Header;
