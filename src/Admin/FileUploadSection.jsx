import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import noPhoto from '../icons/no-photo.svg';
import Auth from '../Auth';

const UploadImgWrapper = styled.div`
  padding-left: 60px;
  padding-bottom: 30px;
`;

const Img = styled.img`
  max-width: 110px;
  max-height: 110px;
  margin: 10px 0;
`;

const ButtonWrapper = styled.div`
  
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

  async sendFiles(file) {
    const form = new FormData();
    const { productId } = this.props;
    form.append('file', file);
    form.append('productId', productId);
    return await fetch('/api/image', {
      headers: {
        Authorization: `bearer ${Auth.getToken()}`,
      },
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

  async fileSelectedHandler(event) {
    const { files } = event.target;
    const promises = Array.from(files).map(async (i) => (await this.setupReader(i)));
    await Promise.all(promises);
  }

  handleChangeFile = () => async (e) => {
    await this.fileSelectedHandler(e);
    const { updateProduct } = this.props;
    updateProduct();
  };

  render() {
    const { image, icon } = this.props;
    return (
      <div>
        <UploadImgWrapper>
          <div>Фото (.jpg)</div>
          <div>
            <Img src={image || noPhoto} alt="" />
          </div>
          <div>
            <ButtonWrapper>
              <Button variant="outlined">
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
            </ButtonWrapper>
          </div>
        </UploadImgWrapper>
        <UploadImgWrapper>
          <div>Иконка (.svg)</div>
          <div>
            <Img src={icon || noPhoto} alt="" />
          </div>
          <div>
            <ButtonWrapper>
              <Button variant="outlined">
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
            </ButtonWrapper>
          </div>
        </UploadImgWrapper>
      </div>
    );
  }
}
