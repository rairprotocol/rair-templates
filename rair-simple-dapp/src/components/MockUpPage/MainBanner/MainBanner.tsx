import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

import { defaultAvatar, hotDropsDefaultBanner } from '../../../images';
import useServerSettings from '../../adminViews/useServerSettings';
import { ImageLazy } from '../ImageLazy/ImageLazy';
import { changeIPFSLink } from '../NftList/utils/changeIPFSLink';

const MainBanner = ({ mainBannerInfo }) => {
  const hotdropsVar = import.meta.env.VITE_TESTNET;

  const { width } = useWindowDimensions();

  const navigate = useNavigate();
  const { getBlockchainData } = useServerSettings();

  const goMainCollection = useCallback(() => {
    if (mainBannerInfo) {
      navigate(
        `/collection/${mainBannerInfo.blockchain}/${mainBannerInfo.contract}/${mainBannerInfo.product}/0`
      );
    }
  }, [mainBannerInfo, navigate]);

  return (
    <div
      className={`collection-background main-banner`}
      style={{
        marginBottom: width <= 850 ? "0px" : ''
      }}
      onClick={() => goMainCollection()}>
      <ImageLazy
        className="picture-banner"
        alt="Collection Banner"
        src={
          mainBannerInfo && mainBannerInfo?.collectionBanner
            ? `${changeIPFSLink(mainBannerInfo?.collectionBanner)}`
            : hotdropsVar === 'true'
              ? hotDropsDefaultBanner
              : 'https://storage.googleapis.com/rair_images/1683038949498-1548817833.jpeg'
        }
      />
      {mainBannerInfo && (
        <div className="collection-background-main-info">
          <div className="collection-info-contract">
            <div className="collection-info-product-name">
              {mainBannerInfo.collectionName}
            </div>
            {mainBannerInfo && mainBannerInfo.user && (
              <div className="collection-info-user">
                {mainBannerInfo &&
                mainBannerInfo.user &&
                mainBannerInfo.user.avatar ? (
                  <img src={mainBannerInfo.user.avatar} alt="avatar" />
                ) : (
                  <img src={defaultAvatar} alt="avatar" />
                )}
                <div>
                  {mainBannerInfo && mainBannerInfo.user
                    ? mainBannerInfo.user.nickName
                    : '123'}
                </div>
              </div>
            )}
          </div>
          {mainBannerInfo.blockchain && (
            <div className="collection-info-blockchain">
              <img
                src={getBlockchainData(mainBannerInfo.blockchain)?.image}
                alt="blockchain"
              />
              {getBlockchainData(mainBannerInfo.blockchain)?.symbol}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MainBanner;
