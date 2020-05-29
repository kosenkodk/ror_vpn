from OpenSSL.crypto import X509Name, X509Req, _openssl_assert, _text_type, _new_mem_buf, FILETYPE_PEM, FILETYPE_ASN1
from OpenSSL._util import (
    ffi as _ffi,
    lib as _lib,
    exception_from_error_queue as _exception_from_error_queue,
    byte_string as _byte_string,
    native as _native,
    UNSPECIFIED as _UNSPECIFIED,
    text_to_bytes_and_warn as _text_to_bytes_and_warn,
    make_assert as _make_assert,
)


class X509NameP(X509Name):
    @property
    def subject_name(self):
        """
        String representation of an X509Name
        """
        result_buffer = _ffi.new("char[]", 512)
        format_result = _lib.X509_NAME_oneline(
            self._name, result_buffer, len(result_buffer))
        _openssl_assert(format_result != _ffi.NULL)

        return "%s" % (
            _native(_ffi.string(result_buffer)),)


class X509ReqP(X509Req):
    def get_subject(self):
        """
        Return the subject of this certificate signing request.
        This creates a new :class:`X509Name` that wraps the underlying subject
        name field on the certificate signing request. Modifying it will modify
        the underlying signing request, and will have the effect of modifying
        any other :class:`X509Name` that refers to this subject.
        :return: The subject of this certificate signing request.
        :rtype: :class:`X509NameP`
        """
        name = X509NameP.__new__(X509NameP)
        name._name = _lib.X509_REQ_get_subject_name(self._req)
        _openssl_assert(name._name != _ffi.NULL)

        # The name is owned by the X509Req structure.  As long as the X509Name
        # Python object is alive, keep the X509Req Python object alive.
        name._owner = self

        return name


def load_certificate_request(type, buffer):
    """
    Load a certificate request (X509Req) from the string *buffer* encoded with
    the type *type*.
    :param type: The file type (one of FILETYPE_PEM, FILETYPE_ASN1)
    :param buffer: The buffer the certificate request is stored in
    :return: The X509Req object
    """
    if isinstance(buffer, _text_type):
        buffer = buffer.encode("ascii")

    bio = _new_mem_buf(buffer)

    if type == FILETYPE_PEM:
        req = _lib.PEM_read_bio_X509_REQ(bio, _ffi.NULL, _ffi.NULL, _ffi.NULL)
    elif type == FILETYPE_ASN1:
        req = _lib.d2i_X509_REQ_bio(bio, _ffi.NULL)
    else:
        raise ValueError("type argument must be FILETYPE_PEM or FILETYPE_ASN1")

    _openssl_assert(req != _ffi.NULL)

    x509ReqP = X509ReqP.__new__(X509ReqP)
    x509ReqP._req = _ffi.gc(req, _lib.X509_REQ_free)
    return x509ReqP
