# Pythonのベースイメージを指定
FROM python:3.12.4

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    build-essential \
    libssl-dev \
    curl

# ユーザーの作成
RUN addgroup --system mercari && adduser --system --ingroup mercari trainee

# コンテナ内の作業ディレクトリを指定
WORKDIR /app

# ローカルのファイルをコンテナ内にコピー
COPY requirements.txt requirements.txt
COPY . .

# requirements.txt に記載されたパッケージをインストール
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install Pillow

# ユーザー権限を変更
RUN chown -R trainee:mercari /app

# 実行ユーザーを変更
USER trainee

# コンテナ起動時に実行するコマンド
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9000"]
