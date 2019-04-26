import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
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

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  setupReader(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (file.size > 5000000) {
          alert('Пожалуйста, выберите файл меньше 5Мб');
          reject();
        } else {
          this.sendFiles(file).then(() => resolve());
        }
      };

      reader.readAsText(file);
    });
  }

  handleChangeFile = () => async (e) => {
    await this.fileSelectedHandler(e);
    const { updateProduct } = this.props;
    updateProduct();
  };

  async fileSelectedHandler(event) {
    const { files } = event.target;
    const promises = Array.from(files).map(async i => (this.setupReader(i)));
    await Promise.all(promises);
  }

  async sendFiles(file) {
    const form = new FormData();
    const { productId } = this.props;
    form.append('file', file);
    form.append('productId', productId);
    return fetch('/api/image', {
      method: 'POST',
      body: form,
    }).then(async (response) => {
      if (response.status !== 200) {
        return;
      }
      const responseData = await response.json();
      console.log(responseData);
    }).catch((e) => {
      console.log(e);
    });
  }

  render() {
    const { image, icon, isNewProduct } = this.props;
    return (
      <div>
        <UploadImgWrapper>
          <div>Фото (.jpg)</div>
          <div>
            <Img src={image || noPhotoIcon} alt="" />
          </div>
          <div>
            <div>
              <Button variant="outlined" disabled={isNewProduct}>
                <Label htmlFor="image">
                Загрзуить
                </Label>
              </Button>
              <FileInput
                id="image"
                type="file"
                onChange={this.handleChangeFile()}
                accept="image/jpeg"
              />
            </div>
          </div>
        </UploadImgWrapper>
        <UploadImgWrapper>
          <div>Иконка (.svg)</div>
          <div>
            <Img src={icon || noPhotoIcon} alt="" />
          </div>
          <div>
            <div>
              <Button variant="outlined" disabled={isNewProduct}>
                <Label htmlFor="icon">
                  Загрзуить
                </Label>
              </Button>
              <FileInput
                id="icon"
                type="file"
                onChange={this.handleChangeFile()}
                accept="image/svg+xml"
              />
            </div>
          </div>
        </UploadImgWrapper>
      </div>
    );
  }
}