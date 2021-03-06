# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_06_02_190144) do

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.integer "record_id", null: false
    t.integer "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "app_clients", force: :cascade do |t|
    t.string "title"
    t.string "url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "bank_cards", force: :cascade do |t|
    t.integer "user_id"
    t.string "full_name"
    t.string "card_no"
    t.string "card_date"
    t.integer "card_code"
    t.integer "country_id"
    t.integer "zip_code"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["country_id"], name: "index_bank_cards_on_country_id"
    t.index ["user_id"], name: "index_bank_cards_on_user_id"
  end

  create_table "black_list_emails", force: :cascade do |t|
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "email_contact"
    t.text "message"
  end

  create_table "cancel_reasons", force: :cascade do |t|
    t.integer "order"
    t.string "title"
    t.text "text"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "configs", force: :cascade do |t|
    t.string "title"
    t.integer "status"
    t.string "vpn_host"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "country_id"
    t.integer "tariff_plan_id"
    t.index ["country_id"], name: "index_configs_on_country_id"
    t.index ["tariff_plan_id"], name: "index_configs_on_tariff_plan_id"
  end

  create_table "contacts", force: :cascade do |t|
    t.string "email"
    t.integer "department"
    t.string "title"
    t.text "message"
    t.string "message_short"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "countries", force: :cascade do |t|
    t.string "name"
    t.string "code"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "departments", force: :cascade do |t|
    t.integer "order"
    t.string "title"
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "email_subscriptions", force: :cascade do |t|
    t.string "title"
    t.text "text"
    t.integer "interval"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "emails", force: :cascade do |t|
    t.string "title"
    t.text "text"
    t.boolean "is_published"
    t.integer "email_subscription_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email_subscription_id"], name: "index_emails_on_email_subscription_id"
  end

  create_table "features", force: :cascade do |t|
    t.integer "order"
    t.string "title"
    t.string "subtitle"
    t.text "text"
    t.boolean "is_published"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "invoices", force: :cascade do |t|
    t.string "no"
    t.integer "invoice_type", default: 0
    t.integer "status", default: 0
    t.float "amount"
    t.string "currency"
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "details_from"
    t.string "title"
    t.index ["user_id"], name: "index_invoices_on_user_id"
  end

  create_table "messages", force: :cascade do |t|
    t.string "title"
    t.text "text"
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "ticket_id"
    t.string "messageable_type"
    t.integer "messageable_id"
    t.integer "status", default: 0
    t.text "url"
    t.index ["messageable_type", "messageable_id"], name: "index_messages_on_messageable_type_and_messageable_id"
    t.index ["ticket_id"], name: "index_messages_on_ticket_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "payment_groups", force: :cascade do |t|
    t.string "title"
    t.integer "order"
    t.boolean "is_on_main_page"
    t.boolean "is_draft"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "payment_methods", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "payment_group_id"
    t.boolean "is_readonly"
    t.boolean "is_for_signup"
    t.boolean "is_active"
    t.string "pay_id"
    t.integer "user_id"
    t.integer "bank_card_id"
    t.index ["bank_card_id"], name: "index_payment_methods_on_bank_card_id"
    t.index ["payment_group_id"], name: "index_payment_methods_on_payment_group_id"
    t.index ["user_id"], name: "index_payment_methods_on_user_id"
  end

  create_table "tariff_plans", force: :cascade do |t|
    t.string "title"
    t.float "price"
    t.integer "duration"
    t.float "price_duration"
    t.float "price_duration_sale"
    t.string "price_comment"
    t.text "features"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "tickets", force: :cascade do |t|
    t.string "title"
    t.text "text"
    t.integer "user_id", null: false
    t.integer "status", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "department_id"
    t.index ["department_id"], name: "index_tickets_on_department_id"
    t.index ["user_id"], name: "index_tickets_on_user_id"
  end

  create_table "todos", force: :cascade do |t|
    t.string "title"
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_todos_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password"
    t.string "password_confirmation"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "password_digest"
    t.integer "role", default: 0, null: false
    t.string "reset_password_token"
    t.datetime "reset_password_token_expires_at"
    t.integer "tariff_plan_id"
    t.integer "payment_method_id"
    t.integer "cancel_reason_id"
    t.text "cancel_account_reason_text"
    t.string "google_secret"
    t.string "salt"
    t.boolean "is2fa", default: false
    t.integer "referrer_id"
    t.integer "country_id"
    t.datetime "expired_at"
    t.boolean "is_refer_bonus_used"
    t.string "ref_code"
    t.index ["cancel_reason_id"], name: "index_users_on_cancel_reason_id"
    t.index ["email"], name: "index_users_on_email"
    t.index ["payment_method_id"], name: "index_users_on_payment_method_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token"
    t.index ["tariff_plan_id"], name: "index_users_on_tariff_plan_id"
  end

  create_table "users_email_subscriptions", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "email_subscription_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email_subscription_id"], name: "index_users_email_subscriptions_on_email_subscription_id"
    t.index ["user_id"], name: "index_users_email_subscriptions_on_user_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "configs", "countries"
  add_foreign_key "configs", "tariff_plans"
  add_foreign_key "invoices", "users"
  add_foreign_key "messages", "tickets"
  add_foreign_key "messages", "users"
  add_foreign_key "payment_methods", "bank_cards"
  add_foreign_key "payment_methods", "users"
  add_foreign_key "tickets", "users"
  add_foreign_key "todos", "users"
  add_foreign_key "users", "cancel_reasons"
  add_foreign_key "users", "payment_methods"
  add_foreign_key "users", "tariff_plans"
end
