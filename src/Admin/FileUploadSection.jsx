import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import noPhotoIcon from '../icons/no-photo.svg';

const UploadImgWrapper = styled.div`
  padding-left: 60px;
  padding-bottom: 30px;
`;

const Img = styled.img`
  max-width: 110px;
  max-height: 110px;
  margin: 10px 0;
`;

const FileInput = styled.input`
  display: none;
`;

const Label = styled.label`
  cursor: pointer;
`;

const UploadForAllTypeCodesCheckbox = styled.div`
  font-size: 12px;
  display: flex;
  padding-top: 10px;
  align-items: center;
`;

const AllTypesCheckBox = ({ handleChangeCheckbox, name }) => (
  <UploadForAllTypeCodesCheckbox>
    <Checkbox
      style={{ padding: '0 10px 0 0' }}
      onChange={handleChangeCheckbox}
      name={name}
    />
    <div>
      Для всех
      <br />
      с артикулом
    </div>
  </UploadForAllTypeCodesCheckbox>
);

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allTypeCodeIcon: false,
      allTypeCodeImage: false,
    };
  }

  setupReader(file, type) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (file.size > 5000000) {
          alert('Пожалуйста, выберите файл меньше 5Мб');
          reject();
        } else {
          this.sendFiles(file, type).then(() => resolve());
        }
      };

      reader.readAsText(file);
    });
  }

  handleChangeFile = type => async (e) => {
    await this.fileSelectedHandler(e, type);
    const { updateProduct } = this.props;
    updateProduct();
  };

  handleChangeCheckbox = (event) => {
    // console.log(event);
    const { target: { name } } = event;
    this.setState(prevState => ({
      [name]: !prevState[name],
    }));
  };

  async fileSelectedHandler(event, type) {
    const { files } = event.target;
    const promises = Array.from(files).map(async i => (this.setupReader(i, type)));
    await Promise.all(promises);
  }

  async sendFiles(file, type) {
    const form = new FormData();
    const {
      productId,
      typeCode,
    } = this.props;
    const {
      allTypeCodeIcon,
      allTypeCodeImage,
    } = this.state;
    form.append('file', file);
    form.append('productId', productId);
    form.append('typeCode', typeCode);
    form.append('allTypeCodeIcon', allTypeCodeIcon);
    form.append('allTypeCodeImage', allTypeCodeImage);
    form.append('type', type);
    return fetch('/api/image', {
      method: 'POST',
      body: form,
    }).then(async () => {
      // if (response.status !== 200) {
      //   return;
      // }
      // const responseData = await response.json();
      // console.log(responseData);
    }).catch(() => {
      // console.log(e);
    });
  }

  render() {
    const {
      image,
      icon,
      isNewProduct,
    } = this.props;
    return (
      <div>
        <UploadImgWrapper>
          <div>Фото</div>
          <div>
            <Img src={image || noPhotoIcon} alt="" />
          </div>
          <div>
            <div>
              <Button variant="outlined" disabled={isNewProduct}>
                <Label htmlFor="image">
                Загрузить
                </Label>
              </Button>
              <FileInput
                id="image"
                type="file"
                onChange={this.handleChangeFile('image')}
                accept="image/jpeg, image/svg+xml"
              />
              <AllTypesCheckBox
                name="allTypeCodeImage"
                handleChangeCheckbox={this.handleChangeCheckbox}
              />
            </div>
          </div>
        </UploadImgWrapper>
        <UploadImgWrapper>
          <div>Иконка</div>
          <div>
            <Img src={icon || noPhotoIcon} alt="" />
          </div>
          <div>
            <div>
              <Button variant="outlined" disabled={isNewProduct}>
                <Label htmlFor="icon">
                  Загрузить
                </Label>
              </Button>
              <FileInput
                id="icon"
                type="file"
                onChange={this.handleChangeFile('icon')}
                accept="image/svg+xml, image/jpeg"
              />
              <AllTypesCheckBox
                name="allTypeCodeIcon"
                handleChangeCheckbox={this.handleChangeCheckbox}
              />
            </div>
          </div>
        </UploadImgWrapper>
      </div>
    );
  }
}
